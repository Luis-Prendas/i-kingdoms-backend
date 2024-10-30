
import { BASE_DB_TABLE } from "../../api";

export interface Base_Race {
  race_name: string;
  description: string;
}

export interface DB_Race extends Base_Race, BASE_DB_TABLE { }

export type DB_Response_RaceWithSubRace = {
  race_id: number
  race_name: string
  sub_race_id: number
  sub_race_name: string
}

export type DB_RaceWithSubRace = {
  race_id: number;
  race_name: string;
  sub_races: string[];
}
