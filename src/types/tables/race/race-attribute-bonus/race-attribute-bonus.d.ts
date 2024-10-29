import { BASE_DB_TABLE } from "../../../api";

export interface Base_RaceAttributeBonus {
  race_id: number;
  attribute_id: number;
  bonus: number;
}

export interface DB_RaceAttributeBonus extends Base_RaceAttributeBonus, BASE_DB_TABLE {}

export type RaceAttributeBonus = Base_RaceAttributeBonus | DB_RaceAttributeBonus;