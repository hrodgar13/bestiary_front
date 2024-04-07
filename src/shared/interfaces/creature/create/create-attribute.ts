import {CreateTranslation} from "./create-translation";
import {AttributeCode} from "../../../static/creature/attributes.code";
import {CharacteristicCode} from "../../../static/creature/characteristic.code";

export interface CreateAttribute {
  id?: number
  attr_cat: AttributeCode | string
  name: CreateTranslation
  scaling_from: CharacteristicCode | null
}
