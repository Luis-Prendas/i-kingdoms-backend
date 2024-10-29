import express from 'express';
import knexConfig from '../../../knex/knexfile';
import knex from 'knex';
import { API_RESPONSE } from '../../../types/api';
import { RaceAttributeBonus } from '../../../types/tables/race/race-attribute-bonus/race-attribute-bonus';

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

const raceAttributeBonusRouter = express.Router();

raceAttributeBonusRouter.get('/', async (req, res) => {
  try {
    const items = await db<RaceAttributeBonus>('race_attribute_bonus').select('*');
    const response: API_RESPONSE<RaceAttributeBonus[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceAttributeBonus[]> = { status: 500, message: '/api/race-attribute-bonus - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceAttributeBonusRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db<RaceAttributeBonus>('race_attribute_bonus').where({ id: Number(id) }).first();
    if (!item) throw new Error('Sub-race not found');
    const response: API_RESPONSE<RaceAttributeBonus> = { status: 200, message: 'OK', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceAttributeBonus> = { status: 500, message: '/api/race-attribute-bonus/:id - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceAttributeBonusRouter.post('/create', async (req, res) => {
  try {
    const { race_id, attribute_id, bonus } = req.body;
    const newItem: RaceAttributeBonus = { race_id, attribute_id, bonus };
    const item = await db<RaceAttributeBonus>('race_attribute_bonus').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 200, message: 'Race Attribute Bonus created successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceAttributeBonus> = { status: 500, message: '/api/race-attribute-bonus/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceAttributeBonusRouter.put('/update', async (req, res) => {
  try {
    const { id, race_id, attribute_id, bonus } = req.body;
    const updatedItem: RaceAttributeBonus = { race_id, attribute_id, bonus };
    const item = await db<RaceAttributeBonus>('race_attribute_bonus').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Race Attribute Bonus updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceAttributeBonus> = { status: 500, message: '/api/race-attribute-bonus/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

raceAttributeBonusRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<RaceAttributeBonus>('race_attribute_bonus').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Race Attribute Bonus deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<RaceAttributeBonus> = { status: 500, message: '/api/race-attribute-bonus/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default raceAttributeBonusRouter;