import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import dotenv from "dotenv";
import { SheetTable } from '../../types/tables/sheet';
import { Sheet } from '../../types/tables/sheet/base';

dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const sheetRouter = express.Router();

/* ---------- SHEET ---------- */
sheetRouter.get('/', async (req, res) => {
  try {
    const items = await db<SheetTable>('sheet').select('*').where('is_deleted', false)
    const response: API_RESPONSE<SheetTable[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetTable[]> = { status: 500, message: '/api/sheet - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

sheetRouter.post('/create', async (req, res) => {
  try {
    const { name, description, proficiency_bonus } = req.body;
    const newItem: Sheet = { name, description, proficiency_bonus };
    const item = await db<SheetTable>('sheet').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 200, message: 'Sheet created successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetTable> = { status: 500, message: '/api/sheet/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

sheetRouter.put('/update', async (req, res) => {
  try {
    const { id, name, description, proficiency_bonus } = req.body;
    const updatedItem: Sheet = { name, description, proficiency_bonus };
    const item = await db<SheetTable>('sheet').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Sheet updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetTable> = { status: 500, message: '/api/sheet/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

sheetRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<SheetTable>('sheet').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Sheet deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetTable> = { status: 500, message: '/api/sheet/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

/* ---------- QUERRYS ---------- */
sheetRouter.get('/all-sheets', async (req, res) => {
  interface AllSheetsResponse extends SheetTable {
    attributes: string
    skills: string
    classes: string
    race: string
  }

  try {
    const query = `
    SELECT
    s.name,
    s.description,
    s.proficiency_bonus,
    -- Atributos (con DISTINCT para evitar repeticiones)
    json_group_array(
        DISTINCT json_object(
            'attribute', a.name,
            'points', sa.points,
            'bonus', sa.bonus,
            'is_competent', sa.is_competent
        )
    ) AS attributes,
    -- Habilidades (con DISTINCT para evitar repeticiones)
    json_group_array(
        DISTINCT json_object(
            'skill', sk.name,
            'points', ss.points,
            'bonus', ss.bonus,
            'is_competent', ss.is_competent
        )
    ) AS skills,
    -- Clases (con DISTINCT para evitar repeticiones)
    json_group_array(
        DISTINCT json_object(
            'level', sc.level,
            'class', c.name,
            'sub_class', scs.name,
            'class_id', sc.class_id,
            'sub_class_id', sc.sub_class_id
        )
    ) AS classes,
    -- Raza
    json_object(
        'race', r.name,
        'sub_race', src.name,
        'race_id', sr.race_id,
        'sub_race_id', src.id
    ) AS race
FROM sheet s
-- Unir atributos
LEFT JOIN sheet_attribute sa ON sa.sheet_id = s.id
LEFT JOIN attribute a ON sa.attribute_id = a.id
-- Unir habilidades
LEFT JOIN sheet_skill ss ON ss.sheet_id = s.id
LEFT JOIN skill sk ON ss.skill_id = sk.id
-- Unir clases
LEFT JOIN sheet_class sc ON sc.sheet_id = s.id
LEFT JOIN class c ON sc.class_id = c.id
LEFT JOIN sub_class scs ON sc.sub_class_id = scs.id
-- Unir razas
LEFT JOIN sheet_race sr ON sr.sheet_id = s.id
LEFT JOIN race r ON sr.race_id = r.id
LEFT JOIN sub_race src ON sr.sub_race_id = src.id
-- Agrupación
GROUP BY s.id;
    `;
    const result = await db.raw(query) as AllSheetsResponse[]
    
    const formattedResult = result.map((row: AllSheetsResponse) => {
      row.attributes = JSON.parse(row.attributes);
      row.skills = JSON.parse(row.skills);
      row.classes = JSON.parse(row.classes);
      row.race = JSON.parse(row.race);
      return row;
    })

    const response: API_RESPONSE<any[]> = { status: 200, message: 'Sheets fetched successfully', response: formattedResult };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetTable[]> = { status: 500, message: '/api/sheet/all-sheet - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

export default sheetRouter;
