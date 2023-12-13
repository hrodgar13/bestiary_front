import {ActionsAbilitiesENUM} from "../../../static/creature/action-abilities-fields.enum";
import {ActionsAndAbilities} from "../form-technical/action-abilities.interface";

export interface ActionsAndAbilitiesAmount {
  [ActionsAbilitiesENUM.abilities]?: ActionsAndAbilities[],
  [ActionsAbilitiesENUM.actions]?: ActionsAndAbilities[]
  [ActionsAbilitiesENUM.bonusActions]?: ActionsAndAbilities[]
  [ActionsAbilitiesENUM.legendaryActions]?: ActionsAndAbilities[]
}
