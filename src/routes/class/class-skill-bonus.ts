import express from 'express';
import knex from 'knex';
import { API_RESPONSE } from '../../types/api';
import knexConfig from '../../knex/knexfile';
import dotenv from "dotenv";
import { ClassSkillBonus } from '../../types/tables/class/base';
import { ClassSkillBonusTable } from '../../types/tables/class';

dotenv.config();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const classSkillBonusRouter = express.Router();

/* ---------- CLASS-SKILL-BONUS ---------- */
classSkillBonusRouter.get('/class-skill-bonus', async (req, res) => {
  try {
    const items = await db<ClassSkillBonusTable>('class_skill_bonus').select('*').where('is_deleted', false);
    const response: API_RESPONSE<ClassSkillBonusTable[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<ClassSkillBonusTable[]> = { status: 500, message: '/api/class-skill-bonus - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

classSkillBonusRouter.post('/class-skill-bonus/create', async (req, res) => {
  try {
    const { bonus, required_level, sub_class_id, skill_id } = req.body;
    const newItem: ClassSkillBonus = { bonus, required_level, sub_class_id, skill_id };
    const item = await db<ClassSkillBonusTable>('class_skill_bonus').insert(newItem);
    const response: API_RESPONSE<number[]> = { status: 201, message: 'Class-skill-bonus created successfully', response: item };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<ClassSkillBonusTable> = { status: 500, message: '/api/class-skill-bonus/create - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

classSkillBonusRouter.put('/class-skill-bonus/update', async (req, res) => {
  try {
    const { id, bonus, required_level, sub_class_id, skill_id } = req.body;
    const updatedItem: ClassSkillBonus = { bonus, required_level, sub_class_id, skill_id };
    const item = await db<ClassSkillBonusTable>('class_skill_bonus').where({ id: Number(id) }).update(updatedItem);
    const response: API_RESPONSE<number> = { status: 200, message: 'Class-skill-bonus updated successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<ClassSkillBonusTable> = { status: 500, message: '/api/class-skill-bonus/update - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

classSkillBonusRouter.delete('/class-skill-bonus/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db<ClassSkillBonusTable>('class_skill_bonus').where({ id: Number(id) }).update({ is_deleted: true });
    const response: API_RESPONSE<number> = { status: 200, message: 'Class-skill-bonus deleted successfully', response: item };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response: API_RESPONSE<ClassSkillBonusTable> = { status: 500, message: '/api/class-skill-bonus/delete - Internal Server Error', response: null };
    res.status(500).json(response);
  }
});

/* ---------- QUERRYS ---------- */
classSkillBonusRouter.get('/join_skill_subClass', async (req, res) => {
  interface Join_Skill_SubClass extends ClassSkillBonusTable {
    skill_name: string;
    sub_class_name: string;
  }

  try {
    const items = await db<Join_Skill_SubClass>('class_skill_bonus')
      .select(
        { id: 'class_skill_bonus.id' },
        { is_deleted: 'class_skill_bonus.is_deleted' },
        { created_at: 'class_skill_bonus.created_at' },
        { updated_at: 'class_skill_bonus.updated_at' },

        { bonus: 'class_skill_bonus.bonus' },
        { required_level: 'class_skill_bonus.required_level' },
        { sub_class_id: 'class_skill_bonus.sub_class_id' },
        { skill_id: 'class_skill_bonus.skill_id' },

        { skill_name: 'skill.name' },
        { sub_class_name: 'sub_class.name' },
      )
      .innerJoin('skill', 'skill.id', 'class_skill_bonus.skill_id')
      .innerJoin('sub_class', 'sub_class.id', 'class_skill_bonus.sub_class_id')
      .where('class_skill_bonus.is_deleted', false)
      .andWhere('skill.is_deleted', false)
      .andWhere('sub_class.is_deleted', false);
    const response: API_RESPONSE<Join_Skill_SubClass[]> = { status: 200, message: 'OK', response: items };
    res.status(200).json(response);
  } catch (error) {
    console.error(error)
    const response: API_RESPONSE<Join_Skill_SubClass[]> = { status: 500, message: '/api/class-skill-bonus?join=skill_subClass - Internal Server Error', response: null };
    res.status(500).json(response);
  }
})

export default classSkillBonusRouter;
