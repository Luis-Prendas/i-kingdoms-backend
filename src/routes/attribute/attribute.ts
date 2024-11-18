import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import dotenv from "dotenv";
import { AttributeTable } from '../../types/tables/attribute';
import { Attribute } from '../../types/tables/attribute/base';
dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

const attributeRouter = express.Router();

attributeRouter.get('/', async (req, res) => {
  try {
    const items = await db<AttributeTable>('attribute').select('*').where('is_deleted', false);
    const response: API_RESPONSE<AttributeTable[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<AttributeTable[]> = { status: 500, message: '/api/attribute - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

attributeRouter.get('/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db<AttributeTable>('attribute').where({ id: Number(id) }).first();
    if (!item) throw new Error('Attribute not found');    
    const response: API_RESPONSE<AttributeTable> = { status: 200, message: 'OK', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<AttributeTable> = { status: 500, message: '/api/attribute/id/:id - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

attributeRouter.post('/create', async (req, res) => {
  try {
    const { name, short_name } = req.body;
    const newItem: Attribute = {
      name: String(name),
      short_name: String(short_name),
      description: ''
    }
    const item = await db<AttributeTable>('attribute').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 201, message: 'Attribute created successfully', response: item };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<AttributeTable> = { status: 500, message: '/api/attribute/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

attributeRouter.put('/update', async (req, res) => {
  try {
    const { id, name, short_name } = req.body;
    const updatedItem: Attribute = {
      name: String(name),
      short_name: String(short_name),
      description: ''
    }
    const item = await db<AttributeTable>('attribute').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Attribute updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<AttributeTable> = { status: 500, message: '/api/attribute/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

attributeRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<AttributeTable>('attribute').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Attribute deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<AttributeTable> = { status: 500, message: '/api/attribute/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default attributeRouter;
