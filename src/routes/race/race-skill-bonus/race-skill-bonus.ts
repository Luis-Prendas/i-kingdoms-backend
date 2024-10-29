import express from 'express';
import knexConfig from '../../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../../types/api';
import { RaceSkillBonus } from '../../../types/tables/race/race-skill-bonus/race-skill-bonus';

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

const raceSkillBonusRouter = express.Router();

raceSkillBonusRouter.get('/', async (req, res) => {
  try {
    const item = await db<RaceSkillBonus>('race_skill_bonus').select('*');
    const response: API_RESPONSE<RaceSkillBonus[]> = { status: 200, message: 'OK', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceSkillBonus[]> = { status: 500, message: '/api/race-skill-bonus - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceSkillBonusRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db<RaceSkillBonus>('race_skill_bonus').where({ id: Number(id) }).first();
    if (!item) throw new Error('RaceSkillBonus not found');
    const response: API_RESPONSE<RaceSkillBonus> = { status: 200, message: 'OK', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceSkillBonus> = { status: 500, message: '/api/race-skill-bonus/:id - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceSkillBonusRouter.post('/create', async (req, res) => {
  try {
    const { sub_race_id, skill_id, bonus } = req.body;
    const newItem: RaceSkillBonus = { sub_race_id, skill_id, bonus };
    const item = await db<RaceSkillBonus>('race_skill_bonus').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 201, message: 'Race skill bonus created successfully', response: item };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceSkillBonus> = { status: 500, message: '/api/race-skill-bonus/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceSkillBonusRouter.put('/update', async (req, res) => {
  try {
    const { id, sub_race_id, skill_id, bonus } = req.body;
    const updatedItem: RaceSkillBonus = { sub_race_id, skill_id, bonus };
    const item = await db<RaceSkillBonus>('race_skill_bonus').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Race skill bonus updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceSkillBonus> = { status: 500, message: '/api/race-skill-bonus/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceSkillBonusRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<RaceSkillBonus>('race_skill_bonus').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Race skill bonus deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceSkillBonus> = { status: 500, message: '/api/race-skill-bonus/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default raceSkillBonusRouter;