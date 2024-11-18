import express from 'express';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import knexConfig from '../../knex/knexfile';
import dotenv from "dotenv";
import { ClassAttributeBonus } from '../../types/tables/class/base';
import { ClassAttributeBonusTable } from '../../types/tables/class';

dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const classAttributeBonusRouter = express.Router();

/* ---------- CLASS-ATTRIBUTE-BONUS ---------- */
classAttributeBonusRouter.get('/', async (req, res) => {
  try {
    const items = await db<ClassAttributeBonusTable>('class_attribute_bonus').select('*').where('is_deleted', false);
    const response: API_RESPONSE<ClassAttributeBonusTable[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<ClassAttributeBonusTable[]> = { status: 500, message: '/api/class-attribute-bonus - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

classAttributeBonusRouter.post('/create', async (req, res) => {
  try {
    const { bonus, required_level, sub_class_id, attribute_id } = req.body;
    const newItem: ClassAttributeBonus = { bonus, required_level, sub_class_id, attribute_id };
    const item = await db<ClassAttributeBonusTable>('class_attribute_bonus').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 201, message: 'Class-attribute-bonus created successfully', response: item };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<ClassAttributeBonusTable> = { status: 500, message: '/api/class-attribute-bonus/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

classAttributeBonusRouter.put('/update', async (req, res) => {
  try {
    const { id, bonus, required_level, sub_class_id, attribute_id } = req.body;
    const updatedItem: ClassAttributeBonus = { bonus, required_level, sub_class_id, attribute_id };
    const item = await db<ClassAttributeBonusTable>('class_attribute_bonus').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Class-attribute-bonus updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<ClassAttributeBonusTable> = { status: 500, message: '/api/class-attribute-bonus/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

classAttributeBonusRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<ClassAttributeBonusTable>('class_attribute_bonus').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Class-attribute-bonus deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<ClassAttributeBonusTable> = { status: 500, message: '/api/class-attribute-bonus/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

/* ---------- QUERRYS ---------- */
classAttributeBonusRouter.get('/join_attribute_subClass', async (req, res) => {
  interface Join_Attribute_SubClass extends ClassAttributeBonusTable {
    attribute_name: string;
    sub_class_name: string;
  }

  try {
    const items = await db<Join_Attribute_SubClass>('class_attribute_bonus')
      .select(
        { id: 'class_attribute_bonus.id' },
        { is_deleted: 'class_attribute_bonus.is_deleted' },
        { created_at: 'class_attribute_bonus.created_at' },
        { updated_at: 'class_attribute_bonus.updated_at' },

        { bonus: 'class_attribute_bonus.bonus' },
        { required_level: 'class_attribute_bonus.required_level' },
        { attribute_id: 'class_attribute_bonus.attribute_id' },
        { sub_class_id: 'class_attribute_bonus.sub_class_id' },

        { attribute_name: 'attribute.name' },
        { sub_class_name: 'sub_class.name' },
      )
      .innerJoin('attribute', 'attribute.id', 'class_attribute_bonus.attribute_id')
      .innerJoin('sub_class', 'sub_class.id', 'class_attribute_bonus.sub_class_id')
      .where('class_attribute_bonus.is_deleted', false)
      .andWhere('attribute.is_deleted', false)
      .andWhere('sub_class.is_deleted', false);
    const response: API_RESPONSE<Join_Attribute_SubClass[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error)
    const response: API_RESPONSE<Join_Attribute_SubClass[]> = { status: 500, message: '/api/class-attribute-bonus?join=attribute_subClass - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

export default classAttributeBonusRouter;
