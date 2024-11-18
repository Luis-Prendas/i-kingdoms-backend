////////////////////////////////////// SHEET //////////////////////////////////////
export interface Sheet {
  name: string;
  description: string;
  proficiency_bonus: number;
}

export interface SheetAttribute {
  points: number;
  bonus: number;
  is_competent: boolean;
  sheet_id: number;
  attribute_id: number;
}

export interface SheetSkill {
  points: number;
  bonus: number;
  is_competent: boolean;
  sheet_id: number;
  skill_id: number;
}

export interface SheetClass {
  level: number;
  sheet_id: number;
  class_id: number;
  sub_class_id: number;
}

export interface SheetRace {
  sheet_id: number;
  race_id: number;
  sub_race_id: number;
}
