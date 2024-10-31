import express from 'express';
import knexConfig from '../../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../../types/api';
import { DB_RaceSkillBonusJoinSubRaceSkill, Base_RaceSkillBonus, DB_RaceSkillBonus } from '../../../types/tables/race/race-skill-bonus/race-skill-bonus';

import dotenv from "dotenv";
dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

const raceSkillBonusRouter = express.Router();

raceSkillBonusRouter.get('/', async (req, res) => {
  try {
    const item = await db<DB_RaceSkillBonus>('race_skill_bonus').select('*');
    const response: API_RESPONSE<DB_RaceSkillBonus[]> = { status: 200, message: 'OK', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_RaceSkillBonus[]> = { status: 500, message: '/api/race-skill-bonus - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceSkillBonusRouter.get('/join-subrace-skill', async (req, res) => {
  try {
    const items = await db<DB_RaceSkillBonusJoinSubRaceSkill>('race_skill_bonus')
      .select(
        { id: 'race_skill_bonus.id' },
        { is_deleted: 'race_skill_bonus.is_deleted' },
        { created_at: 'race_skill_bonus.created_at' },
        { updated_at: 'race_skill_bonus.updated_at' },
        { bonus: 'race_skill_bonus.bonus' },
        { sub_race_id: 'sub_race.id' },
        { skill_id: 'skill.id' },
        { attribute_id: 'attribute.id' },
        { sub_race_name: 'sub_race.sub_race_name' },
        { skill_name: 'skill.skill_name' },
        { attribute_name: 'attribute.attribute_name' },
      )
      .innerJoin('sub_race', 'sub_race.id', 'race_skill_bonus.sub_race_id')
      .innerJoin('skill', 'skill.id', 'race_skill_bonus.skill_id')
      .innerJoin('attribute', 'attribute.id', 'skill.attribute_id')
      .where('race_skill_bonus.is_deleted', false).andWhere('sub_race.is_deleted', false).andWhere('skill.is_deleted', false).andWhere('attribute.is_deleted', false);
    const response: API_RESPONSE<DB_RaceSkillBonusJoinSubRaceSkill[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_RaceSkillBonusJoinSubRaceSkill[]> = { status: 500, message: '/api/race-skill-bonus/join-subrace-skill - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

raceSkillBonusRouter.get('/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db<DB_RaceSkillBonus>('race_skill_bonus').where({ id: Number(id) }).first();
    if (!item) throw new Error('RaceSkillBonus not found');
    const response: API_RESPONSE<DB_RaceSkillBonus> = { status: 200, message: 'OK', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_RaceSkillBonus> = { status: 500, message: '/api/race-skill-bonus/id/:id - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceSkillBonusRouter.post('/create', async (req, res) => {
  try {
    const { sub_race_id, skill_id, bonus } = req.body;
    const newItem: Base_RaceSkillBonus = { sub_race_id, skill_id, bonus };
    const item = await db<DB_RaceSkillBonus>('race_skill_bonus').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 201, message: 'Race skill bonus created successfully', response: item };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_RaceSkillBonus> = { status: 500, message: '/api/race-skill-bonus/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceSkillBonusRouter.put('/update', async (req, res) => {
  try {
    const { id, sub_race_id, skill_id, bonus } = req.body;
    const updatedItem: Base_RaceSkillBonus = { sub_race_id, skill_id, bonus };
    const item = await db<DB_RaceSkillBonus>('race_skill_bonus').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Race skill bonus updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_RaceSkillBonus> = { status: 500, message: '/api/race-skill-bonus/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceSkillBonusRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<DB_RaceSkillBonus>('race_skill_bonus').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Race skill bonus deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_RaceSkillBonus> = { status: 500, message: '/api/race-skill-bonus/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default raceSkillBonusRouter;