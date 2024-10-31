import { BASE_DB_TABLE } from "../../../api";

export interface Base_RaceAttributeBonus {
  sub_race_id: number;
  attribute_id: number;
  bonus: number;
}

export interface DB_RaceAttributeBonus extends Base_RaceAttributeBonus, BASE_DB_TABLE {}

export interface DB_RaceAttributeBonusJoinSubRaceAttribute extends DB_RaceAttributeBonus {
  sub_race_name: string;
  attribute_name: string;
}
