import express from 'express';
import knex from 'knex';
import knexConfig from '../../../knex/knexfile';
import { API_RESPONSE } from '../../../types/api';
import { Base_SkillBonus, DB_SkillBonus, DB_SkillBonusJoinSkillClass } from '../../../types/tables/class/skill-bonus/skill-bonus';

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

const skillBonusRouter = express.Router();

skillBonusRouter.get('/', async (req, res) => {
  try {
    const items = await db<DB_SkillBonus>('class_skill_bonus').select('*');
    const response: API_RESPONSE<DB_SkillBonus[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_SkillBonus[]> = { status: 500, message: '/api/skill-bonus - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

skillBonusRouter.get('/join-skill-class', async (req, res) => {
  try {
    const items = await db<DB_SkillBonusJoinSkillClass>('class_skill_bonus')
      .select(
        { id: 'class_skill_bonus.id' },
        { is_deleted: 'class_skill_bonus.is_deleted' },
        { bonus: 'class_skill_bonus.bonus' },
        { required_level: 'class_skill_bonus.required_level' },
        { skill_id: 'skill.id' },
        { skill_name: 'skill.skill_name' },
        { sub_class_id: 'sub_class.id' },
        { sub_class_name: 'sub_class.sub_class_name' },
        { created_at: 'class_skill_bonus.created_at' },
        { updated_at: 'class_skill_bonus.updated_at' }
      )
      .innerJoin('skill', 'skill.id', 'class_skill_bonus.skill_id')
      .innerJoin('sub_class', 'sub_class.id', 'class_skill_bonus.sub_class_id')
      .where('class_skill_bonus.is_deleted', false)
      .andWhere('skill.is_deleted', false)
      .andWhere('sub_class.is_deleted', false);
    const response: API_RESPONSE<DB_SkillBonusJoinSkillClass[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_SkillBonusJoinSkillClass[]> = { status: 500, message: '/api/skill-bonus/join-skill-class - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

skillBonusRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db<DB_SkillBonus>('class_skill_bonus').where({ id: Number(id) }).first();
    if (!item) throw new Error('SkillBonus not found');
    const response: API_RESPONSE<DB_SkillBonus> = { status: 200, message: 'OK', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_SkillBonus> = { status: 500, message: '/api/skill-bonus/:id - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

skillBonusRouter.post('/create', async (req, res) => {
  try {
    const { bonus, required_level, skill_id, sub_class_id } = req.body;
    const newItem: Base_SkillBonus = { bonus, required_level, skill_id, sub_class_id };
    const item = await db<DB_SkillBonus>('class_skill_bonus').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 201, message: 'Skill-bonus created successfully', response: item };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_SkillBonus> = { status: 500, message: '/api/skill-bonus/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

skillBonusRouter.put('/update', async (req, res) => {
  try {
    const { id, bonus, required_level, skill_id, sub_class_id } = req.body;
    const updatedItem: Base_SkillBonus = { bonus, required_level, skill_id, sub_class_id };
    const item = await db<DB_SkillBonus>('class_skill_bonus').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Skill-bonus updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_SkillBonus> = { status: 500, message: '/api/skill-bonus/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

skillBonusRouter.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<DB_SkillBonus>('class_skill_bonus').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Skill-bonus deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<DB_SkillBonus> = { status: 500, message: '/api/skill-bonus/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

export default skillBonusRouter;