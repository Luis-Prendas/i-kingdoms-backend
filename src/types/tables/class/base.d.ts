////////////////////////////////////// CLASS //////////////////////////////////////
export interface Class {
  name: string;
  description: string;
}

export interface SubClass {
  name: string;
  description: string;
  required_level: number;
  class_id: number;
}

export interface ClassAttributeBonus {
  bonus: number;
  required_level: number;
  sub_class_id: number;
  attribute_id: number;
}

export interface ClassSkillBonus {
  bonus: number;
  required_level: number;
  sub_class_id: number;
  skill_id: number;
}
