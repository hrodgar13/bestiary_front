export interface CreateMeasure {
  id?: number
  measure_cat: string
  amt: number | null
  isMeasureEnable: boolean | null
  attribute: number
}
