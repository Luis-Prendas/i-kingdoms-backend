import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import dotenv from "dotenv";
import { SheetRaceTable } from '../../types/tables/sheet';
import { SheetRace } from '../../types/tables/sheet/base';

dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const sheetRaceRouter = express.Router();

/* ---------- SHEET RACE ---------- */
sheetRaceRouter.get('/', async (req, res) => {
  try {
    const items = await db<SheetRaceTable>('sheet_race').select('*').where('is_deleted', false)
    const response: API_RESPONSE<SheetRaceTable[]> = { status: 200, message: 'OK', response: items }; 
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetRaceTable[]> = { status: 500, message: '/api/sheet-race - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

sheetRaceRouter.post('/create', async (req, res) => {
  try {
    const { sheet_id, race_id, sub_race_id } = req.body;
    const newItem: SheetRace = { sheet_id, race_id, sub_race_id };
    const item = await db<SheetRaceTable>('sheet').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 200, message: 'Sheet created successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetRaceTable> = { status: 500, message: '/api/sheet/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

sheetRaceRouter.put('/update', async (req, res) => {
  try {
    const { id, sheet_id, race_id, sub_race_id } = req.body;
    const updatedItem: SheetRace = { sheet_id, race_id, sub_race_id };
    const item = await db<SheetRaceTable>('sheet').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Sheet updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetRaceTable> = { status: 500, message: '/api/sheet/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

sheetRaceRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<SheetRaceTable>('sheet').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Sheet deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetRaceTable> = { status: 500, message: '/api/sheet/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default sheetRaceRouter;
