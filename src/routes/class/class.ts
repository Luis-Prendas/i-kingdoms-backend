import express from 'express';
import knex from 'knex';
import { Base_Class, DB_Class } from '../../types/tables/class/class';
import { API_RESPONSE } from '../../types/api';
import knexConfig from '../../knex/knexfile';
import subClassRouter from './sub-class/sub-class';
import skillBonusRouter from './skill-bonus/skill-bonus';
import attributeBonusRouter from './attribute-bonus/attribute-bonus';

import dotenv from "dotenv";
dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

const classRouter = express.Router();

classRouter.use('/sub-class', subClassRouter);
classRouter.use('/sub-class/skill-bonus', skillBonusRouter);
classRouter.use('/sub-class/attribute-bonus', attributeBonusRouter);

classRouter.get('/', async (req, res) => {
  try {
    const items = await db<DB_Class>('class').select('*').where('is_deleted', false);
    const response: API_RESPONSE<DB_Class[]> = { status: 200, message: 'OK', response: items }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_Class[]> = { status: 500, message: '/api/class - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

classRouter.post('/create', async (req, res) => {
  try {
    const { class_name, description } = req.body;
    const newItem: Base_Class = { class_name, description };
    const item = await db<DB_Class>('class').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 201, message: 'Class created successfully', response: item };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_Class> = { status: 500, message: '/api/class/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

classRouter.put('/update', async (req, res) => {
  try {
    const { id, class_name, description } = req.body;
    const updatedItem: Base_Class = { class_name, description };
    const item = await db<DB_Class>('class').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Class updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_Class> = { status: 500, message: '/api/class/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

classRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<DB_Class>('class').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Class deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_Class> = { status: 500, message: '/api/class/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default classRouter;