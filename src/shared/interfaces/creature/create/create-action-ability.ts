import {ActionAbilities} from "../../../static/creature/action-abilities.code";
import {CreateTranslation} from "./create-translation";

export interface CreateActionAbility {
  id?: number
  actionType: ActionAbilities | string
  title: CreateTranslation
  description: CreateTranslation
}
