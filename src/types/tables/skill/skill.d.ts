import { BASE_DB_TABLE } from "../../api";

export interface Base_Skill {
  skill_name: string;
  short_name: string;
  attribute_id: number;
}

export interface DB_Skill extends Base_Skill, BASE_DB_TABLE { }

export type Skill = Base_Skill | DB_Skill;

export interface DB_SkillWithRelation {
  skill_id: number;
  skill_name: string;
  short_name: string;
  attribute_id: number;
  attribute_name: string;
}