import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import { Attribute } from '../../types/tables/attribute/attrbute';
import { API_RESPONSE } from '../../types/api';

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

const attributeRouter = express.Router();

attributeRouter.get('/', async (req, res) => {
  try {
    const items = await db<Attribute>('attribute').select('*').where('is_deleted', false);
    const response: API_RESPONSE<Attribute[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Attribute[]> = { status: 500, message: '/api/attribute - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

attributeRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db<Attribute>('attribute').where({ id: Number(id) }).first();
    if (!item) throw new Error('Attribute not found');
    const response: API_RESPONSE<Attribute> = { status: 200, message: 'OK', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Attribute> = { status: 500, message: '/api/attribute/:id - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

attributeRouter.post('/create', async (req, res) => {
  try {
    const { attribute_name, short_name } = req.body;
    const newItem: Attribute = {
      attribute_name: String(attribute_name),
      short_name: String(short_name),
    }
    const item = await db<Attribute>('attribute').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 201, message: 'Attribute created successfully', response: item };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Attribute> = { status: 500, message: '/api/attribute/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

attributeRouter.put('/update', async (req, res) => {
  try {
    const { id, attribute_name, short_name } = req.body;
    const updatedItem: Attribute = {
      attribute_name: String(attribute_name),
      short_name: String(short_name),
    }
    const item = await db<Attribute>('attribute').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Attribute updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Attribute> = { status: 500, message: '/api/attribute/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

attributeRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<Attribute>('attribute').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Attribute deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Attribute> = { status: 500, message: '/api/attribute/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default attributeRouter;
