import express from 'express';
import knexConfig from '../../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../../types/api';
import { SubRace } from '../../../types/tables/race/sub-race/sub-race';

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

const subRaceRouter = express.Router();

subRaceRouter.get('/', async (req, res) => {
  try {
    const items = await db<SubRace>('sub_race').select('*');
    const response: API_RESPONSE<SubRace[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SubRace[]> = { status: 500, message: '/api/sub-race - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

subRaceRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db<SubRace>('sub_race').where({ id: Number(id) }).first();
    if (!item) throw new Error('Sub-race not found');
    const response: API_RESPONSE<SubRace> = { status: 200, message: 'OK', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SubRace> = { status: 500, message: '/api/sub-race/:id - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

subRaceRouter.post('/create', async (req, res) => {
  try {
    const { race_id, sub_race_name } = req.body;
    const newItem: SubRace = { race_id, sub_race_name };
    const item = await db<SubRace>('sub_race').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 200, message: 'Sub-race created successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<number[]> = { status: 500, message: '/api/sub-race/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

subRaceRouter.put('/update', async (req, res) => {
  try {
    const { id, race_id, sub_race_name } = req.body;
    const updatedItem: SubRace = { race_id, sub_race_name };
    const item = await db<SubRace>('sub_race').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Sub-race updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<number> = { status: 500, message: '/api/sub-race/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

subRaceRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<SubRace>('sub_race').where({ id: Number(id) }).update({ is_deleted: true})
    const response: API_RESPONSE<number> = { status: 200, message: 'Sub-race deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<number> = { status: 500, message: '/api/sub-race/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default subRaceRouter;