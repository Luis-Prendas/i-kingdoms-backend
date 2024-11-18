import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import dotenv from "dotenv";
import { RaceTable } from '../../types/tables/race';
import { Race } from '../../types/tables/race/base';

dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const raceRouter = express.Router();

/* ---------- RACE ---------- */
raceRouter.get('/', async (req, res) => {
  try {
    const items = await db<RaceTable>('race').select('*').where("is_deleted", false);
    const response: API_RESPONSE<RaceTable[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceTable[]> = { status: 500, message: '/api/race - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceRouter.post('/create', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newItem: Race = { name, description };
    const item = await db<RaceTable>('race').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 200, message: 'Race created successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceTable> = { status: 500, message: '/api/race/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

raceRouter.put('/update', async (req, res) => {
  try {
    const { id, name, description } = req.body;
    const updatedItem: Race = { name, description };
    const item = await db<RaceTable>('race').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Race updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceTable> = { status: 500, message: '/api/race/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<RaceTable>('race').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Race deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceTable> = { status: 500, message: '/api/race/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default raceRouter
