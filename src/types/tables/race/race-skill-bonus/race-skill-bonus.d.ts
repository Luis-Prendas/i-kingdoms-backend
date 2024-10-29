import { BASE_DB_TABLE } from "../../../api";

export interface Base_RaceSkillBonus {
  sub_race_id: number
  skill_id: number
  bonus: number
}

export interface DB_RaceSkillBonus extends Base_RaceSkillBonus, BASE_DB_TABLE { }

export type RaceSkillBonus = Base_RaceSkillBonus | DB_RaceSkillBonus