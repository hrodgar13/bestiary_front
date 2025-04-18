import {Translation} from "../creature/get/translation";
import {UniverseInterface} from "../universes/universe.interface";

export interface UniverseTagInterface {
  id?: number
  tagName: Translation
  universes?: UniverseInterface[]
}
