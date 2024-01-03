import {Translation} from "./translation";
import {Creature} from "./creature";
import {Measure} from "./measure";

export interface Attribute {
    id: number
    attr_cat: string
    name: Translation
    measures: Measure[]
    creatures: Creature[];
}
