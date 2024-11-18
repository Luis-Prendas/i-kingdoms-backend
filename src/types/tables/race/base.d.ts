////////////////////////////////////// RACE //////////////////////////////////////
export interface Race {
  name: string;
  description: string;
}

export interface SubRace {
  name: string;
  description: string;
  race_id: number;
}

export interface RaceAttributeBonus {
  bonus: number;
  sub_race_id: number;
  attribute_id: number;
}

export interface RaceSkillBonus {
  bonus: number;
  sub_race_id: number;
  skill_id: number;
}
