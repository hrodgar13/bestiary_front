import {CreateTranslation} from "./create-translation";
import {CreateStatBlock} from "./create-stat-block";
import {CreateMeasure} from "./create-measure";
import {CreateActionAbility} from "./create-action-ability";

export interface CreateCreature {
  id?: number
  isFinished: boolean
  name: CreateTranslation
  armor_class: number | null
  image: string | null
  hits: string | null
  hits_in_dice: string | null
  danger_lvl: number | null
  experience: string | null
  mastery_bonus: number | null
  stat_block: CreateStatBlock
  measures: CreateMeasure[]
  attributes: number[]
  action_abilities: CreateActionAbility[]
  description: CreateTranslation
}
