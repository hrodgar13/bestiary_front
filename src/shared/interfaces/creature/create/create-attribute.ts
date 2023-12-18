import {CreateTranslation} from "./create-translation";
import {Attributes} from "../../../static/creature/attributes.code";

export interface CreateAttribute {
  id?: number
  attr_cat: Attributes | string
  name: CreateTranslation
}
