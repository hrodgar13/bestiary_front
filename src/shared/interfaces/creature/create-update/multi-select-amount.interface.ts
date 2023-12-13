import {CreateAttributeMeasure} from "./create-attribute-measure.interface";
import {MultiFieldsENUM} from "../../../static/creature/multi-fields.enum";

export interface MultiSelectAmount {
  [MultiFieldsENUM.immunities]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.vulnerabilities]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.speeds]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.resists]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.feelings]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.savingThrows]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.skills]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.conditionsImmunities]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.languages]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.regions]?: CreateAttributeMeasure[]
}
