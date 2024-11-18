import express from 'express';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import knexConfig from '../../knex/knexfile';
import dotenv from "dotenv";
import { ClassTable } from '../../types/tables/class';
import { Class } from '../../types/tables/class/base';

dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const classRouter = express.Router();

/* ---------- CLASS ---------- */
classRouter.get('/', async (req, res) => {
  try {
    const items = await db<ClassTable>('class').select('*').where('is_deleted', false);
    const response: API_RESPONSE<ClassTable[]> = { status: 200, message: 'OK', response: items }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<ClassTable[]> = { status: 500, message: '/api/class - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

classRouter.post('/create', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newItem: Class = { name, description };
    const item = await db<ClassTable>('class').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 201, message: 'Class created successfully', response: item };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<ClassTable> = { status: 500, message: '/api/class/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

classRouter.put('/update', async (req, res) => {
  try {
    const { id, name, description } = req.body;
    const updatedItem: Class = { name, description };
    const item = await db<ClassTable>('class').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Class updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<ClassTable> = { status: 500, message: '/api/class/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

classRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<ClassTable>('class').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Class deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<ClassTable> = { status: 500, message: '/api/class/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default classRouter;
