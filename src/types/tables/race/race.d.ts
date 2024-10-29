
import { BASE_DB_TABLE } from "../../api";

export interface Base_Race {
  race_name: string;
}

export interface DB_Race extends Base_Race, BASE_DB_TABLE { }

export type Race = Base_Race | DB_Race;