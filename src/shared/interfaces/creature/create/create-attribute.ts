import {CreateTranslation} from "./create-translation";
import {AttributeCode} from "../../../static/creature/attributes.code";

export interface CreateAttribute {
  id?: number
  attr_cat: AttributeCode | string
  name: CreateTranslation
}
