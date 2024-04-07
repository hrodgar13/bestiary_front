import {Translation} from "./translation";
import {Creature} from "./creature";
import {Measure} from "./measure";
import {CharacteristicCode} from "../../../static/creature/characteristic.code";

export interface Attribute {
    id: number
    attr_cat: string
    scaling_from: CharacteristicCode | null
    name: Translation
    measures: Measure[]
    creatures: Creature[];
}
