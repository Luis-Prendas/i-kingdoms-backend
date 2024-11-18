import { BaseTable } from "../../api";
import { Race, SubRace, RaceAttributeBonus, RaceSkillBonus } from "./base";

////////////////////////////////////// RACE //////////////////////////////////////
export interface RaceTable extends BaseTable, Race {}

export interface SubRaceTable extends BaseTable, SubRace {}

export interface RaceAttributeBonusTable extends BaseTable, RaceAttributeBonus {}

export interface RaceSkillBonusTable extends BaseTable, RaceSkillBonus {}
