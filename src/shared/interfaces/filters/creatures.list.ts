import {Translation} from "../creature/get/translation";

export interface FilteredCreatureListItem {
    id: number
    creatureName: Translation
}

export interface FilteredCreatureList {
    dangerLvl: number
    creature: FilteredCreatureListItem[]
}

export interface FilteredCreatureDataMetaDto {
  creatures: FilteredCreatureList[]
  total: number
}
