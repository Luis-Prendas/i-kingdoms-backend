import { BASE_DB_TABLE } from "../../../api";

export interface Base_SkillBonus {
    sub_class_id: number;
    skill_id: number;
    bonus: number;
    required_level: number;
}

export interface DB_SkillBonus extends Base_SkillBonus, BASE_DB_TABLE { }

export type SkillBonus = Base_SkillBonus | DB_SkillBonus;

export interface DB_SkillBonusJoinSkillClass extends DB_SkillBonus {
  skill_name: string;
  sub_class_name: string;
}
