import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import dotenv from "dotenv";
import { API_RESPONSE } from '../../types/api';
import { RaceSkillBonusTable } from '../../types/tables/race';
import { RaceSkillBonus } from '../../types/tables/race/base';

dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const raceSkillBonusRouter = express.Router();

/* ---------- RACE-SKILL-BONUS ---------- */
raceSkillBonusRouter.get('/', async (req, res) => {
  try {
    const items = await db<RaceSkillBonusTable>('race_attribute_bonus').select('*').where('is_deleted', false);
    const response: API_RESPONSE<RaceSkillBonusTable[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceSkillBonusTable[]> = { status: 500, message: '/api/race-skill-bonus - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceSkillBonusRouter.post('/create', async (req, res) => {
  try {
    const { sub_race_id, skill_id, bonus } = req.body;
    const newItem: RaceSkillBonus = { sub_race_id, skill_id, bonus };
    const item = await db<RaceSkillBonusTable>('race_skill_bonus').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 201, message: 'Race-skill-bonus created successfully', response: item };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceSkillBonusTable> = { status: 500, message: '/api/race-skill-bonus/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceSkillBonusRouter.put('/update', async (req, res) => {
  try {
    const { id, sub_race_id, skill_id, bonus } = req.body;
    const updatedItem: RaceSkillBonus = { sub_race_id, skill_id, bonus };
    const item = await db<RaceSkillBonusTable>('race_skill_bonus').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Race-skill-bonus updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceSkillBonusTable> = { status: 500, message: '/api/race-skill-bonus/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceSkillBonusRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<RaceSkillBonusTable>('race_skill_bonus').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Race-skill-bonus deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceSkillBonusTable> = { status: 500, message: '/api/race-skill-bonus/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

/* ---------- QUERRYS ---------- */
raceSkillBonusRouter.get('/join_subRace_skill_attribute', async (req, res) => {
  interface Join_SubRace_Skill extends RaceSkillBonusTable {
    sub_race_name: string;
    skill_name: string;
    attribute_name: string;
    attribute_id: number;
  }

  try {
    const items = await db<Join_SubRace_Skill>('race_skill_bonus')
      .select(
        { id: 'race_skill_bonus.id' },
        { is_deleted: 'race_skill_bonus.is_deleted' },
        { created_at: 'race_skill_bonus.created_at' },
        { updated_at: 'race_skill_bonus.updated_at' },

        { bonus: 'race_skill_bonus.bonus' },
        { sub_race_id: 'race_skill_bonus.sub_race_id' },
        { skill_id: 'race_skill_bonus.skill_id' },
        
        { sub_race_name: 'sub_race.name' },
        { skill_name: 'skill.name' },
        { attribute_name: 'attribute.name' },
        { attribute_id: 'attribute.id' },
      )
      .innerJoin('sub_race', 'sub_race.id', 'race_skill_bonus.sub_race_id')
      .innerJoin('skill', 'skill.id', 'race_skill_bonus.skill_id')
      .innerJoin('attribute', 'attribute.id', 'skill.attribute_id')
      .where('race_skill_bonus.is_deleted', false).andWhere('sub_race.is_deleted', false).andWhere('skill.is_deleted', false).andWhere('attribute.is_deleted', false);
    const response: API_RESPONSE<Join_SubRace_Skill[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Join_SubRace_Skill[]> = { status: 500, message: '/api/race-skill-bonus/join-subrace-skill - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

export default raceSkillBonusRouter;