import { BaseTable } from "../../api";
import { Class, SubClass, ClassAttributeBonus, ClassSkillBonus } from "./base";

////////////////////////////////////// CLASS //////////////////////////////////////
export interface ClassTable extends BaseTable, Class {}

export interface SubClassTable extends BaseTable, SubClass {}

export interface ClassAttributeBonusTable extends BaseTable, ClassAttributeBonus {}

export interface ClassSkillBonusTable extends BaseTable, ClassSkillBonus {}
