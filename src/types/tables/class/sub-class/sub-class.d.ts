import { BASE_DB_TABLE } from "../../../api";

export interface Base_SubClass {
    class_id: number;
    sub_class_name: string;
    description: string;
    required_level: number;
}

export interface DB_SubClass extends Base_SubClass, BASE_DB_TABLE { }

export interface DB_SubClassJoinClass extends DB_SubClass {
  class_name: string;
}