import {StatBlock} from "./statblock";
import {Measure} from "./measure";
import {Attribute} from "./attribute";
import {Translation} from "./translation";
import {ActionsAbilities} from "./actions-abilities";

export interface Creature {
    id: number
    isFinished: boolean
    name: Translation
    armor_class: number | null
    hits: string | null
    hits_in_dice: string | null
    danger_lvl: number | null
    experience: string | null
    mastery_bonus: number | null
    stat_block: StatBlock
    measures: Measure[]
    attributes: Attribute[]
    action_abilities: ActionsAbilities[]
    description: Translation
}
