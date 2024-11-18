import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import dotenv from "dotenv";
import { API_RESPONSE } from '../../types/api';
import { SubRaceTable } from '../../types/tables/race';
import { SubRace } from '../../types/tables/race/base';

dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const subRaceRouter = express.Router();

/* ---------- SUB-RACE ---------- */
subRaceRouter.get('/', async (req, res) => {
  try {
    const items = await db<SubRaceTable>('sub_race').select('*').where('is_deleted', false);
    const response: API_RESPONSE<SubRaceTable[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<SubRaceTable[]> = { status: 500, message: '/api/sub-race - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

subRaceRouter.post('/create', async (req, res) => {
  try {
    const { race_id, name, description } = req.body;
    const newItem: SubRace = { race_id, name, description };
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
    const { id, race_id, name, description } = req.body;
    const updatedItem: SubRace = { race_id, name, description };
    const item = await db<SubRaceTable>('sub_race').where({ id: Number(id) }).update(updatedItem);
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
    const item = await db<SubRaceTable>('sub_race').where({ id: Number(id) }).update({ is_deleted: true })
    const response: API_RESPONSE<number> = { status: 200, message: 'Sub-race deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<number> = { status: 500, message: '/api/sub-race/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

/* ---------- QUERRYS ---------- */
subRaceRouter.get('/join_race', async (req, res) => {
  interface Join_Race extends SubRaceTable {
    race_name: string;
  }

  try {
    const items = await db<Join_Race>('sub_race')
      .select(
        { id: 'sub_race.id' },
        { is_deleted: 'sub_race.is_deleted' },
        { created_at: 'sub_race.created_at' },
        { updated_at: 'sub_race.updated_at' },

        { name: 'sub_race.name' },
        { description: 'sub_race.description' },
        { race_id: 'sub_race.race_id' },

        { race_name: 'race.name' },
      )
      .innerJoin('race', 'race.id', 'sub_race.race_id')
      .where('sub_race.is_deleted', false).andWhere('race.is_deleted', false);
    const response: API_RESPONSE<Join_Race[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Join_Race[]> = { status: 500, message: '/api/sub-race/join-race - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

export default subRaceRouter;
