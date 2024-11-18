import express from 'express';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import knexConfig from '../../knex/knexfile';
import dotenv from "dotenv";
import { SubClassTable } from '../../types/tables/class';
import { SubClass } from '../../types/tables/class/base';

dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const subClassRouter = express.Router();

/* ---------- SUB-CLASS ---------- */
subClassRouter.get('/', async (req, res) => {
  try {
    const items = await db<SubClassTable>('sub_class').select('*').where('is_deleted', false);
    const response: API_RESPONSE<SubClassTable[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SubClassTable[]> = { status: 500, message: '/api/sub-class - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

subClassRouter.post('/create', async (req, res) => {
  try {
    const { name, class_id, required_level, description } = req.body;
    const newItem: SubClass = { name, class_id, required_level, description };
    const item = await db<SubClassTable>('sub_class').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 201, message: 'Sub-class created successfully', response: item };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SubClassTable> = { status: 500, message: '/api/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

subClassRouter.put('/update', async (req, res) => {
  try {
    const { id, name, class_id, required_level, description } = req.body;
    const updatedItem: SubClass = { name, class_id, required_level, description };
    const item = await db<SubClassTable>('sub_class').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Sub-class updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SubClassTable> = { status: 500, message: '/api/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

subClassRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<SubClassTable>('sub_class').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Sub-class deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SubClassTable> = { status: 500, message: '/api/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

/* ---------- QUERRYS ---------- */
subClassRouter.get('/join_class', async (req, res) => {
  interface Join_Class extends SubClassTable {
    class_name: string;
  }

  try {
    const items = await db<Join_Class>('sub_class')
      .select(
        { id: 'sub_class.id' },
        { is_deleted: 'sub_class.is_deleted' },
        { created_at: 'sub_class.created_at' },
        { updated_at: 'sub_class.updated_at' },

        { class_id: 'sub_class.class_id' },
        { name: 'sub_class.name' },
        { description: 'sub_class.description' },
        { required_level: 'sub_class.required_level' },
        
        { class_name: 'class.name' },
      )
      .innerJoin('class', 'class.id', 'sub_class.class_id')
      .where('sub_class.is_deleted', false).andWhere('class.is_deleted', false);
    const response: API_RESPONSE<Join_Class[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error)
    const response: API_RESPONSE<Join_Class[]> = { status: 500, message: '/api/sub-class?join=class - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

export default subClassRouter;
