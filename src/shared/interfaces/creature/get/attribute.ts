import {Translation} from "./translation";
import {Creature} from "./creature";
import {Measure} from "./measure";
import {CharacteristicCode} from "../../../static/creature/characteristic.code";

export interface Attribute {
    id: number
    attr_cat: string
    scalingFrom: CharacteristicCode | null
    name: Translation
    measures: Measure[]
    creatures: Creature[];
}
