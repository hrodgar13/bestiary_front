import {CreateTranslationAttribute} from "../creature/create-update/create-attribute.interface";

export interface CreatureFilterInterface {
  attributeName: string
  ids: number[]
  mustContainAllSelected: null | boolean
}

export interface FilterLabel {
  attr: string
  values: FilterLabelValues[]
}

export interface FilterLabelValues {
  id: number
  attrName: CreateTranslationAttribute
}
