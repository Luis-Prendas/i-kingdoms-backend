import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import { DB_SkillJoinAttribute, Base_Skill, DB_Skill } from '../../types/tables/skill/skill';

import dotenv from "dotenv";
dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

const skillRouter = express.Router();

skillRouter.get('/', async (req, res) => {
  try {
    const items = await db<DB_Skill>('skill').select('*').where('is_deleted', false)
    const response: API_RESPONSE<DB_Skill[]> = { status: 200, message: 'OK', response: items }; 
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_Skill[]> = { status: 500, message: '/api/skill - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

skillRouter.get('/join-attribute', async (req, res) => {
  try {
    const items: DB_SkillJoinAttribute[] = await db('skill')
      .select({
        id: 'skill.id',
        is_deleted: 'skill.is_deleted',
        skill_name: 'skill.skill_name',
        short_name: 'skill.short_name',
        created_at: 'skill.created_at',
        updated_at: 'skill.updated_at',
        attribute_name: 'attribute.attribute_name',
        attribute_id: 'attribute.id'
      })
      .innerJoin('attribute', 'attribute.id', 'skill.attribute_id')
      .where('skill.is_deleted', false).andWhere('attribute.is_deleted', false);
    const response: API_RESPONSE<DB_SkillJoinAttribute[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_SkillJoinAttribute[]> = { status: 500, message: '/api/skill/join-attribute - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

skillRouter.get('/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db<DB_Skill>('skill').where({ id: Number(id) }).first();
    if (!item) throw new Error('Skill not found');
    const response: API_RESPONSE<DB_Skill> = { status: 200, message: 'OK', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_Skill> = { status: 500, message: '/api/skill/id/:id - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

skillRouter.post('/create', async (req, res) => {
  try {
    const { skill_name, short_name, attribute_id } = req.body;
    const newItem: Base_Skill = { skill_name, short_name, attribute_id };
    const item = await db<DB_Skill>('skill').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 200, message: 'Skill created successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_Skill> = { status: 500, message: '/api/skill/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

skillRouter.put('/update', async (req, res) => {
  try {
    const { id, skill_name, short_name, attribute_id } = req.body;
    const updatedItem: Base_Skill = { skill_name, short_name, attribute_id };
    const item = await db<DB_Skill>('skill').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Skill updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_Skill> = { status: 500, message: '/api/skill/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

skillRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<DB_Skill>('skill').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Skill deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_Skill> = { status: 500, message: '/api/skill/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default skillRouter;