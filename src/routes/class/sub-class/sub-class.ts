import express from 'express';
import knex from 'knex';
import { API_RESPONSE } from '../../../types/api';
import knexConfig from '../../../knex/knexfile';
import { Base_SubClass, DB_SubClass, DB_SubClassJoinClass } from '../../../types/tables/class/sub-class/sub-class';

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

const subClassRouter = express.Router();

subClassRouter.get('/', async (req, res) => {
  try {
    const items = await db<DB_SubClass>('sub_class').select('*');
    const response: API_RESPONSE<DB_SubClass[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_SubClass[]> = { status: 500, message: '/api/sub-class - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

subClassRouter.get('/join-class', async (req, res) => {
  try {
    const items = await db<DB_SubClassJoinClass>('sub_class')
      .select(
        { id: 'sub_class.id' },
        { is_deleted: 'sub_class.is_deleted' },
        { sub_class_name: 'sub_class.sub_class_name' },
        { description: 'sub_class.description' },
        { class_name: 'class.class_name' },
        { class_id: 'class.id' },
        { created_at: 'sub_class.created_at' },
        { updated_at: 'sub_class.updated_at' }
      )
      .innerJoin('class', 'class.id', 'sub_class.class_id')
      .where('sub_class.is_deleted', false).andWhere('class.is_deleted', false);
    const response: API_RESPONSE<DB_SubClassJoinClass[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error)
    const response: API_RESPONSE<DB_SubClassJoinClass[]> = { status: 500, message: '/api/sub-class/join-class - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

subClassRouter.post('/create', async (req, res) => {
  try {
    const { sub_class_name, class_id, required_level, description } = req.body;
    const newItem: Base_SubClass = { sub_class_name, class_id, required_level, description };
    const item = await db<DB_SubClass>('sub_class').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 201, message: 'Sub-class created successfully', response: item };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_SubClass> = { status: 500, message: '/api/sub-class/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

subClassRouter.put('/update', async (req, res) => {
  try {
    const { id, sub_class_name, class_id, required_level, description } = req.body;
    const updatedItem: Base_SubClass = { sub_class_name, class_id, required_level, description };
    const item = await db<DB_SubClass>('sub_class').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Sub-class updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_SubClass> = { status: 500, message: '/api/sub-class/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

subClassRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<DB_SubClass>('sub_class').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Sub-class deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_SubClass> = { status: 500, message: '/api/sub-class/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default subClassRouter;