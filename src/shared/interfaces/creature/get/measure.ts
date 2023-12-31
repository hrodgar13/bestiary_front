import {Attribute} from "./attribute";
import {Creature} from "./creature";

export interface Measure {
  id?: number
  measure_cat: string
  amt: number | null
  isMeasureEnable: boolean | null
  attribute?: Attribute
  creature?: Creature
}
