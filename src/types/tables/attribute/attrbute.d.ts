import { BASE_DB_TABLE } from "../../api";

export interface Base_Attribute {
  attribute_name: string;
  short_name: string;
}

export interface DB_Attribute extends Base_Attribute, BASE_DB_TABLE {}