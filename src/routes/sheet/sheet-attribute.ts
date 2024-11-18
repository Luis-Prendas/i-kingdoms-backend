import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import dotenv from "dotenv";
import { SheetAttributeTable } from '../../types/tables/sheet';
import { SheetAttribute } from '../../types/tables/sheet/base';

dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const sheetAttributeRouter = express.Router();

/* ---------- SHEET ATTRIBUTE ---------- */
sheetAttributeRouter.get('/', async (req, res) => {
  try {
    const items = await db<SheetAttributeTable>('sheet_attribute').select('*').where('is_deleted', false)
    const response: API_RESPONSE<SheetAttributeTable[]> = { status: 200, message: 'OK', response: items }; 
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetAttributeTable[]> = { status: 500, message: '/api/sheet-attribute - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

sheetAttributeRouter.post('/create', async (req, res) => {
  try {
    const { points, bonus, is_competent, sheet_id, attribute_id } = req.body;
    const newItem: SheetAttribute = { points, bonus, is_competent, sheet_id, attribute_id };
    const item = await db<SheetAttributeTable>('sheet_attribute').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 200, message: 'Sheet Attribute created successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetAttributeTable> = { status: 500, message: '/api/sheet-attribute/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

sheetAttributeRouter.put('/update', async (req, res) => {
  try {
    const { id, points, bonus, is_competent, sheet_id, attribute_id } = req.body;
    const updatedItem: SheetAttribute = { points, bonus, is_competent, sheet_id, attribute_id };
    const item = await db<SheetAttributeTable>('sheet_attribute').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Sheet Attribute updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetAttributeTable> = { status: 500, message: '/api/sheet-attribute/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

sheetAttributeRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<SheetAttributeTable>('sheet_attribute').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Sheet Attribute deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SheetAttributeTable> = { status: 500, message: '/api/sheet-attribute/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default sheetAttributeRouter;
