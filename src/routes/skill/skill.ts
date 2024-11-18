import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import dotenv from "dotenv";
import { SkillTable } from '../../types/tables/skill';
import { Skill } from '../../types/tables/skill/base';

dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const skillRouter = express.Router();

/* ---------- SKILL ---------- */
skillRouter.get('/', async (req, res) => {
  try {
    const items = await db<SkillTable>('skill').select('*').where('is_deleted', false)
    const response: API_RESPONSE<SkillTable[]> = { status: 200, message: 'OK', response: items }; 
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SkillTable[]> = { status: 500, message: '/api/skill - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

skillRouter.post('/create', async (req, res) => {
  try {
    const { name, short_name, attribute_id } = req.body;
    const newItem: Skill = { name, short_name, attribute_id, description: '' };
    const item = await db<SkillTable>('skill').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 200, message: 'Skill created successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SkillTable> = { status: 500, message: '/api/skill/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

skillRouter.put('/update', async (req, res) => {
  try {
    const { id, name, short_name, attribute_id } = req.body;
    const updatedItem: Skill = { name, short_name, attribute_id, description: '' };
    const item = await db<SkillTable>('skill').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Skill updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SkillTable> = { status: 500, message: '/api/skill/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

skillRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<SkillTable>('skill').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Skill deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SkillTable> = { status: 500, message: '/api/skill/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

/* ---------- QUERRYS ---------- */
skillRouter.get('/?join=attribute', async (req, res) => {
  interface Join_Attribute extends SkillTable {
    attribute_name: string;
  }

  try {
    const items: Join_Attribute[] = await db('skill')
      .select({
        id: 'skill.id',
        is_deleted: 'skill.is_deleted',
        created_at: 'skill.created_at',
        updated_at: 'skill.updated_at',

        name: 'skill.name',
        short_name: 'skill.short_name',
        attribute_id: 'skill.attribute_id',

        attribute_name: 'attribute.name',
      })
      .innerJoin('attribute', 'attribute.id', 'skill.attribute_id')
      .where('skill.is_deleted', false).andWhere('attribute.is_deleted', false);
    const response: API_RESPONSE<Join_Attribute[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Join_Attribute[]> = { status: 500, message: '/api/skill/join-attribute - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default skillRouter;