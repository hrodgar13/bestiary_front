import {CreateActionAbility} from "./create-action-ability";

export interface EditActionAbility {
  old: CreateActionAbility,
  new: CreateActionAbility
}
