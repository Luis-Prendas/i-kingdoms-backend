import { BASE_DB_TABLE } from "../../../api";

export interface Base_AttributeBonus {
    sub_class_id: number;
    attribute_id: number;
    bonus: number;
    required_level: number;
}

export interface DB_AttributeBonus extends Base_AttributeBonus, BASE_DB_TABLE { }

export interface DB_AttributeBonusJoinAttributeClass extends DB_AttributeBonus {
  attribute_name: string;
  sub_class_name: string;
}