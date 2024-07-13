export interface UniverseInterface {
  id: number
  hat: UniverseHatInterface
  categories: any[]
  timeline: any
}

export interface UniverseHatInterface {
  id: number
  universeName: string
  description: UniverseStructureParagraphInterface[]
  images: string[]
  imagePosition: 'right' | 'left'
}

export interface UniverseStructureParagraphInterface {
  id: number
  title: string
  type: 'text' | 'number' | 'date' | 'image' | 'list'
  metadata: JSON
}

export interface TextMetadataMetadataParagraphInterface {
  description: string
}

export interface NumberMetadataParagraphInterface {
  value: number
}
export interface DateMetadataParagraphInterface {
  year: number
  month: number
  day: number
}

export interface ImageMetadataParagraphInterface {
  imageUrl: string
  width: number
  height: number
  photoAlignment: 'left' | 'center' | 'right'
}

export interface ListMetadataParagraphInterface {
  type: 'letter' | 'number' | 'symbol'
  listItems: string[]
}

export interface UniverseCategoryInterface {
  id: number
  title: number
  isOpened: boolean
  items: UniverseCategoryItem[]
}

export interface UniverseCategoryItem {
  id: number
  title: string
  information: UniverseStructureParagraphInterface[]
}
