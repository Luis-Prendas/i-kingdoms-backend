import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import { Base_Race, DB_Race, DB_RaceWithSubRace, DB_Response_RaceWithSubRace } from '../../types/tables/race/race';
import { groupedByRace } from '../../lib/group-by-race';
import subRaceRouter from './sub-race/sub-race';
import raceSkillBonusRouter from './race-skill-bonus/race-skill-bonus';

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

const raceRouter = express.Router();

raceRouter.use('/sub-race', subRaceRouter);
raceRouter.use('/skill-bonus', raceSkillBonusRouter);

raceRouter.get('/', async (req, res) => {
  try {
    const items = await db<DB_Race>('race').select('*').where("is_deleted", false);
    const response: API_RESPONSE<DB_Race[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_Race[]> = { status: 500, message: '/api/race - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceRouter.get('/with-sub-race', async (req, res) => {
  try {
    const items: DB_Response_RaceWithSubRace[] = await db('race')
      .select({
        race_id: 'race.id',
        race_name: 'race.race_name',
        sub_race_id: 'sub_race.id',
        sub_race_name: 'sub_race.sub_race_name'
      })
      .innerJoin('sub_race', 'sub_race.race_id', 'race.id')
      .where('race.is_deleted', false).andWhere('sub_race.is_deleted', false)

    const response: API_RESPONSE<DB_RaceWithSubRace[]> = { status: 200, message: 'OK', response: groupedByRace(items) };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_RaceWithSubRace[]> = { status: 500, message: '/api/race/all-relation - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

raceRouter.post('/create', async (req, res) => {
  try {
    const { race_name, description } = req.body;
    const newItem: Base_Race = { race_name, description };
    const item = await db<DB_Race>('race').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 200, message: 'Race created successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_Race> = { status: 500, message: '/api/race/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

raceRouter.put('/update', async (req, res) => {
  try {
    const { id, race_name, description } = req.body;
    const updatedItem: Base_Race = { race_name, description };
    const item = await db<DB_Race>('race').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Race updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_Race> = { status: 500, message: '/api/race/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<DB_Race>('race').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Race deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_Race> = { status: 500, message: '/api/race/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default raceRouter
