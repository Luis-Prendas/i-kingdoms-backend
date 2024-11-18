import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import dotenv from "dotenv";
import { SheetClassTable } from '../../types/tables/sheet';
import { SheetClass } from '../../types/tables/sheet/base';

dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const sheetClassRouter = express.Router();

/* ---------- SHEET CLASS ---------- */
sheetClassRouter.get('/', async (req, res) => {
  try {
    const items = await db<SheetClassTable>('sheet_class').select('*').where('is_deleted', false)
    const response: API_RESPONSE<SheetClassTable[]> = { status: 200, message: 'OK', response: items }; 
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetClassTable[]> = { status: 500, message: '/api/sheet-class - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

sheetClassRouter.post('/create', async (req, res) => {
  try {
    const { level, sheet_id, class_id, sub_class_id } = req.body;
    const newItem: SheetClass = { level, sheet_id, class_id, sub_class_id };
    const item = await db<SheetClassTable>('sheet').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 200, message: 'Sheet created successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetClassTable> = { status: 500, message: '/api/sheet/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

sheetClassRouter.put('/update', async (req, res) => {
  try {
    const { id, level, sheet_id, class_id, sub_class_id } = req.body;
    const updatedItem: SheetClass = { level, sheet_id, class_id, sub_class_id };
    const item = await db<SheetClassTable>('sheet').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Sheet updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetClassTable> = { status: 500, message: '/api/sheet/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

sheetClassRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<SheetClassTable>('sheet').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Sheet deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetClassTable> = { status: 500, message: '/api/sheet/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default sheetClassRouter;
