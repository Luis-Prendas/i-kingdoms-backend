import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import { Race } from '../../types/tables/race/race';

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

const raceRouter = express.Router();

raceRouter.get('/', async (req, res) => {
  try {
    const items = await db<Race>('race').select('*');
    const response: API_RESPONSE<Race[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Race[]> = { status: 500, message: '/api/race - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db<Race>('race').where({ id: Number(id) }).first();
    if (!item) throw new Error('Race not found');
    const response: API_RESPONSE<Race> = { status: 200, message: 'OK', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Race> = { status: 500, message: '/api/race/:id - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceRouter.post('/create', async (req, res) => {
  try {
    const { race_name } = req.body;
    const newItem: Race = { race_name };
    const item = await db<Race>('race').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 200, message: 'Race created successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Race> = { status: 500, message: '/api/race/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

raceRouter.put('/update', async (req, res) => {
  try {
    const { id, race_name } = req.body;
    const updatedItem: Race = { id, race_name };
    const item = await db<Race>('race').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Race updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Race> = { status: 500, message: '/api/race/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<Race>('race').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Race deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Race> = { status: 500, message: '/api/race/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default raceRouter