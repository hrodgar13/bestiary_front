import {CreateTranslationAttribute} from "./create-attribute.interface";
import {ActionsAndAbilitiesAmount} from "./attributes-abilities-amount";
import {MultiSelectAmount} from "./multi-select-amount.interface";

export interface CreaturePayload {
  isFinished: boolean,
  creatureName?: CreateTranslationAttribute,
  alignment?: number,
  type?: number,
  size?: number,
  armorClass?: number
  armorTag?: number
  hits?: number,
  hitsInDice?: string,
  strength?: number,
  dexterity?: number,
  construction?: number,
  intelligence?: number,
  wisdom?: number,
  charisma?: number,
  multiSelects: MultiSelectAmount
  dangerLevel?: number,
  experience?: string,
  masteryBonus?: number
  actionsAbilities: ActionsAndAbilitiesAmount
  description?: CreateTranslationAttribute
}
