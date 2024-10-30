import { BASE_DB_TABLE } from "../../../api";

export interface Base_RaceSkillBonus {
  sub_race_id: number
  skill_id: number
  bonus: number
}

export interface DB_RaceSkillBonus extends Base_RaceSkillBonus, BASE_DB_TABLE { }

export type RaceSkillBonus = Base_RaceSkillBonus | DB_RaceSkillBonus

export interface DB_RaceSkillBonusJoinSubRaceSkill extends DB_RaceSkillBonus {
  sub_race_name: string;
  skill_name: string;
  attribute_name: string;
  attribute_id: number;
}