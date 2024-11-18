import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import dotenv from "dotenv";
import { SheetSkillTable } from '../../types/tables/sheet';
import { SheetSkill } from '../../types/tables/sheet/base';

dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const sheetSkillRouter = express.Router();

/* ---------- SHEET SKILL ---------- */
sheetSkillRouter.get('/', async (req, res) => {
  try {
    const items = await db<SheetSkillTable>('sheet_skill').select('*').where('is_deleted', false)
    const response: API_RESPONSE<SheetSkillTable[]> = { status: 200, message: 'OK', response: items }; 
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetSkillTable[]> = { status: 500, message: '/api/sheet-skill - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

sheetSkillRouter.post('/create', async (req, res) => {
  try {
    const { points, bonus, is_competent, sheet_id, skill_id } = req.body;
    const newItem: SheetSkill = { points, bonus, is_competent, sheet_id, skill_id };
    const item = await db<SheetSkillTable>('sheet_skill').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 200, message: 'Sheet Skill created successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetSkillTable> = { status: 500, message: '/api/sheet-skill/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

sheetSkillRouter.put('/update', async (req, res) => {
  try {
    const { id, points, bonus, is_competent, sheet_id, skill_id } = req.body;
    const updatedItem: SheetSkill = { points, bonus, is_competent, sheet_id, skill_id };
    const item = await db<SheetSkillTable>('sheet_skill').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Sheet Skill updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetSkillTable> = { status: 500, message: '/api/sheet-skill/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

sheetSkillRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<SheetSkillTable>('sheet_skill').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Sheet Skill deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetSkillTable> = { status: 500, message: '/api/sheet-skill/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default sheetSkillRouter;
