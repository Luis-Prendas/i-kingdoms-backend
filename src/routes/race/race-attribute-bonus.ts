import express from 'express';
import knexConfig from '../../knex/knexfile';
import knex from 'knex';
import dotenv from "dotenv";
import { API_RESPONSE } from '../../types/api';
import { RaceAttributeBonusTable } from '../../types/tables/race';
import { RaceAttributeBonus } from '../../types/tables/race/base';

dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const raceAttributeBonusRouter = express.Router();

/* ---------- RACE-ATTRIBUTE-BONUS ---------- */
raceAttributeBonusRouter.get('/', async (req, res) => {
  try {
    const items = await db<RaceAttributeBonusTable>('race_attribute_bonus').select('*').where('is_deleted', false);
    const response: API_RESPONSE<RaceAttributeBonusTable[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceAttributeBonusTable[]> = { status: 500, message: '/api/race-attribute-bonus - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceAttributeBonusRouter.post('/create', async (req, res) => {
  try {
    const { sub_race_id, attribute_id, bonus } = req.body;
    const newItem: RaceAttributeBonus = { sub_race_id, attribute_id, bonus };
    const item = await db<RaceAttributeBonusTable>('race_attribute_bonus').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 201, message: 'Race-attribute-bonus created successfully', response: item };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceAttributeBonusTable> = { status: 500, message: '/api/race-attribute-bonus/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceAttributeBonusRouter.put('/update', async (req, res) => {
  try {
    const { id, sub_race_id, attribute_id, bonus } = req.body;
    const updatedItem: RaceAttributeBonus = { sub_race_id, attribute_id, bonus };
    const item = await db<RaceAttributeBonusTable>('race_attribute_bonus').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Race-attribute-bonus updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceAttributeBonusTable> = { status: 500, message: '/api/race-attribute-bonus/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceAttributeBonusRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<RaceAttributeBonusTable>('race_attribute_bonus').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Race-attribute-bonus deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceAttributeBonusTable> = { status: 500, message: '/api/race-attribute-bonus/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

/* ---------- QUERRYS ---------- */
raceAttributeBonusRouter.get('/join_subRace_attribute', async (req, res) => {
  interface Join_SubRace_Attribute extends RaceAttributeBonusTable {
    sub_race_name: string;
    attribute_name: string;
  }

  try {
    const items = await db<Join_SubRace_Attribute>('race_attribute_bonus')
      .select(
        { id: 'race_attribute_bonus.id' },
        { is_deleted: 'race_attribute_bonus.is_deleted' },
        { created_at: 'race_attribute_bonus.created_at' },
        { updated_at: 'race_attribute_bonus.updated_at' },

        { sub_race_id: 'sub_race.id' },
        { attribute_id: 'attribute.id' },
        { bonus: 'race_attribute_bonus.bonus' },

        { sub_race_name: 'sub_race.name' },
        { attribute_name: 'attribute.name' },
      )
      .innerJoin('sub_race', 'sub_race.id', 'race_attribute_bonus.sub_race_id')
      .innerJoin('attribute', 'attribute.id', 'race_attribute_bonus.attribute_id')
      .where('race_attribute_bonus.is_deleted', false).andWhere('sub_race.is_deleted', false).andWhere('attribute.is_deleted', false);
    const response: API_RESPONSE<Join_SubRace_Attribute[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<Join_SubRace_Attribute[]> = { status: 500, message: '/api/race-attribute-bonus/join-subrace-attribute - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

export default raceAttributeBonusRouter;