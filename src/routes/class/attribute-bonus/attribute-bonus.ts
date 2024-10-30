import express from 'express';
import knex from 'knex';
import knexConfig from '../../../knex/knexfile';
import { API_RESPONSE } from '../../../types/api';
import { Base_AttributeBonus, DB_AttributeBonus, DB_AttributeBonusJoinAttributeClass } from '../../../types/tables/class/attribute-bonus/attribute-bonus';

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

const attributeBonusRouter = express.Router();

attributeBonusRouter.get('/', async (req, res) => {
  try {
    const items = await db<DB_AttributeBonus>('class_attribute_bonus').select('*');
    const response: API_RESPONSE<DB_AttributeBonus[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_AttributeBonus[]> = { status: 500, message: '/api/attribute-bonus - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

attributeBonusRouter.get('/join-attribute-class', async (req, res) => {
  try {
    const items = await db<DB_AttributeBonusJoinAttributeClass>('class_attribute_bonus')
      .select(
        { id: 'class_attribute_bonus.id' },
        { is_deleted: 'class_attribute_bonus.is_deleted' },
        { bonus: 'class_attribute_bonus.bonus' },
        { required_level: 'class_attribute_bonus.required_level' },
        { attribute_id: 'attribute.id' },
        { attribute_name: 'attribute.attribute_name' },
        { sub_class_id: 'sub_class.id' },
        { sub_class_name: 'sub_class.sub_class_name' },
        { created_at: 'class_attribute_bonus.created_at' },
        { updated_at: 'class_attribute_bonus.updated_at' }
      )
      .innerJoin('attribute', 'attribute.id', 'class_attribute_bonus.attribute_id')
      .innerJoin('sub_class', 'sub_class.id', 'class_attribute_bonus.sub_class_id')
      .where('class_attribute_bonus.is_deleted', false)
      .andWhere('attribute.is_deleted', false)
      .andWhere('sub_class.is_deleted', false);
    const response: API_RESPONSE<DB_AttributeBonusJoinAttributeClass[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_AttributeBonusJoinAttributeClass[]> = { status: 500, message: '/api/attribute-bonus/join-attribute-class - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

attributeBonusRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db<DB_AttributeBonus>('class_attribute_bonus').where({ id: Number(id) }).first();
    if (!item) throw new Error('Attribute-bonus not found');
    const response: API_RESPONSE<DB_AttributeBonus> = { status: 200, message: 'OK', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_AttributeBonus> = { status: 500, message: '/api/attribute-bonus/:id - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

attributeBonusRouter.post('/create', async (req, res) => {
  try {
    const { bonus, required_level, attribute_id, sub_class_id } = req.body;
    const newItem: Base_AttributeBonus = { bonus, required_level, attribute_id, sub_class_id };
    const item = await db<DB_AttributeBonus>('class_attribute_bonus').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 201, message: 'Attribute-bonus created successfully', response: item };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_AttributeBonus> = { status: 500, message: '/api/attribute-bonus/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

attributeBonusRouter.put('/update', async (req, res) => {
  try {
    const { id, bonus, required_level, attribute_id, sub_class_id } = req.body;
    const updatedItem: Base_AttributeBonus = { bonus, required_level, attribute_id, sub_class_id };
    const item = await db<DB_AttributeBonus>('class_attribute_bonus').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Attribute-bonus updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_AttributeBonus> = { status: 500, message: '/api/attribute-bonus/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

attributeBonusRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<DB_AttributeBonus>('class_attribute_bonus').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Attribute-bonus deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_AttributeBonus> = { status: 500, message: '/api/attribute-bonus/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default attributeBonusRouter;