import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import { Skill } from '../../types/tables/skill/skill';

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

const skillRouter = express.Router();

skillRouter.get('/', async (req, res) => {
  try {
    const items = await db<Skill>('skill').select('*');
    const response: API_RESPONSE<Skill[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Skill[]> = { status: 500, message: '/api/skill - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

skillRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db<Skill>('skill').where({ id: Number(id) }).first();
    if (!item) throw new Error('Skill not found');
    const response: API_RESPONSE<Skill> = { status: 200, message: 'OK', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Skill> = { status: 500, message: '/api/skill/:id - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

skillRouter.post('/create', async (req, res) => {
  try {
    const { skill_name, short_name, attribute_id } = req.body;
    const newItem: Skill = { skill_name, short_name, attribute_id };
    const item = await db<Skill>('skill').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 200, message: 'Skill created successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Skill> = { status: 500, message: '/api/skill/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

skillRouter.put('/update', async (req, res) => {
  try {
    const { id, skill_name, short_name, attribute_id } = req.body;
    const updatedItem: Skill = { id, skill_name, short_name, attribute_id };
    const item = await db<Skill>('skill').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Skill updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Skill> = { status: 500, message: '/api/skill/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

skillRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<Skill>('skill').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Skill deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Skill> = { status: 500, message: '/api/skill/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default skillRouter;