import {Creature} from "./creature";
import {Translation} from "./translation";

export interface ActionsAbilities {
    id: number
    action_type: string
    title: Translation
    description: Translation
    creature: Creature
}
