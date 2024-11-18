import { BaseTable } from "../../api";
import { Sheet, SheetAttribute, SheetSkill, SheetClass, SheetRace } from "./base";

////////////////////////////////////// SHEET //////////////////////////////////////
export interface SheetTable extends BaseTable, Sheet {}

export interface SheetAttributeTable extends BaseTable, SheetAttribute {}

export interface SheetSkillTable extends BaseTable, SheetSkill {}

export interface SheetClassTable extends BaseTable, SheetClass {}

export interface SheetRaceTable extends BaseTable, SheetRace {}
