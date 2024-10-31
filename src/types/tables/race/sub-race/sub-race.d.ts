import { BASE_DB_TABLE } from "../../../api";

export interface Base_SubRace {
  race_id: number;
  sub_race_name: string;
  description: string;
}

export interface DB_SubRace extends Base_SubRace, BASE_DB_TABLE { }

export interface DB_SubRaceJoinRace extends DB_SubRace {
  race_name: string;
}