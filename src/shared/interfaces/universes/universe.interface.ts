export interface UniverseInterface {
  id: number
  hat?: UniverseHatInterface
  categories?: UniverseCategoryInterface[]
  timeline: any
}

export interface UniverseHatInterface {
  id?: number
  universeName: string
  description: UniverseStructureParagraphInterface[]
  images: string[]
  imagePosition: 'right' | 'left'
}

export interface UniverseStructureParagraphInterface {
  id?: number
  order: number
  title: string
  type: 'text' | 'number' | 'date' | 'image' | 'list'
  metadata: JSON
}

export interface TextMetadataParagraphInterface {
  description: string
}

export interface NumberMetadataParagraphInterface {
  value: number
}

export interface DateMetadataParagraphInterface {
  year?: number
  month?: number
  day?: number
}

export interface ImageMetadataParagraphInterface {
  imageUrl?: string
  width?: number
  height?: number
  photoAlignment: 'left' | 'center' | 'right'
}

export interface ListMetadataParagraphInterface {
  type: 'letter' | 'number' | 'symbol'
  listItems: string[]
}

export interface UniverseCategoryInterface {
  id?: number
  title: string
  isOpened?: boolean
  items?: UniverseCategoryItem[]
}

export interface UniverseCategoryItem {
  id: number
  title: string
  information: UniverseStructureParagraphInterface[]
}


export interface UniverseListItem {
  id: number
  title: string
  imageUrl: string
  filterCategories: string[]
}


export const MOCK_UNIVERSE_LIST: UniverseListItem[] = [
  {
    id: 0,
    title: 'Viribus Unitis',
    filterCategories: ['fantasy', 'dark fantasy', 'horror', 'grandma'],
    imageUrl: 'https://i.pinimg.com/564x/e9/4a/5b/e94a5bc8ba68e1eef3b3dd7eeb9f2e0f.jpg'
  },
  {
    id: 1,
    title: 'Bioshy',
    filterCategories: ['post apocalypse', 'mystic', 'multiple plans', 'mushrooms'],
    imageUrl: 'https://i.pinimg.com/564x/d3/54/fb/d354fb8630f1cdadcd062116ad838917.jpg'
  }
]


export const MOCK_UNIVERSE: UniverseInterface = {
  id: 0,
  hat: {
    id: 0,
    universeName: "ViribusUnitis",
    description: [
      {
        id: 0,
        order: 0,
        title: '',
        type: 'text',
        metadata: JSON.parse(`{"description": "Здрастуйте, мій шановний читачу. Сьогодні день нашого знайомства. Мене звуть Лайош, і я сценарист цього твору. В мої обов'язки входить продумування, планування та створення сюжетів, написання новел, а в майбутньому, можливо, навіть сценаріїв. Другий член нашої маленької команди - Олівець. Наш найкращий дизайнер, художник і людина, яка допомагає мені у написанні сценарію. Відповідає за все, що у нас виглядає стильно."}`)
      },
      {
        id: 1,
        order: 1,
        title: '',
        type: 'text',
        metadata: JSON.parse(`{"description": "Viribus Unitis (Об'єднаними зусиллями, латинь) - це всесвіт, у якому відбуваються події коміксів і новел, що наразі знаходяться в розробці. Це всесвіт у жанрі темного фентезі, де є магія (хоча й не зовсім у класичному її розумінні), досить велике різноманіття рас і  народностей. Поступово, у процесі викладання постів, буде презентована карта, опис держав, міст, народностей, історій тощо."}`)
      },
      {
        id: 2,
        order: 2,
        title: '',
        type: 'text',
        metadata: JSON.parse(`{"description": "Події у рамках цього всесвіту, які будуть демонструватися тут, матимуть відтінок (18+), тому ми настійно рекомендуємо всім, хто не досяг цього віку, залишити цей канал. Це не формальне попередження - ми справді створюємо твори не для неповнолітніх, і тут вас очікуватимуть не стільки кров і кишки, скільки питання, на які дуже складно дати відповіді. Усі персонажі та місця вигадані, будь-які збіги випадкові. Ми раді вітати всіх любителів всесвітів у жанрі фентезі!"}`)
      },
    ],
    images: [
      'VU-poster.png'
    ],
    imagePosition: "right"
  },
  categories: [
    {
      id: 0,
      title: 'Боги',
      isOpened: false,
      items: []
    },
    {
      id: 1,
      title: 'Важливі Люди',
      isOpened: false,
      items: [
        {
          id: 0,
          title: 'Кальман',
          information: [
            {
              id: 3,
              order: 1,
              type: 'image',
              title: 'Кальман',
              metadata: JSON.parse(`{"imageUrl": "calman.png",
                 "width": 279,
                 "height": 390,
                 "photoAlignment": "right"}`)
            },
            {
              id: 4,
              order: 2,
              title: "Народився",
              type: "date",
              metadata: JSON.parse(`{"year": "1078"}`)
            },
            {
              id: 5,
              order: 3,
              title: "Помер",
              type: "date",
              metadata: JSON.parse(`{"year": "1154"}`)
            },
            {
              id: 6,
              order: 4,
              title: "Місце народження",
              type: "text",
              metadata: JSON.parse(`{"description": "Озерна Імперія"}`)
            },
            {
              id: 7,
              order: 5,
              title: "Цитата",
              type: "text",
              metadata: JSON.parse(`{"description": "\\"Ульріх, мені приснився дракон\\""}`)
            },
            {
              id: 8,
              order: 6,
              title: "Біографія",
              type: "text",
              metadata: JSON.parse(`{"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci dolore, enim exercitationem facere id impedit modi mollitia nesciunt odit perspiciatis quas quis rem vero vitae voluptas voluptatibus? Autem culpa  eaque illum in labore libero molestiae quod! adipisicing elit. A adipisci dolore, enim exercitationem facere id impedit modi mollitia nesciunt odit perspiciatis quas quis rem vero vitae voluptas voluptatibus? Autem culpa eaque illum in labore libero molestiae quod!" }`)
            },
            {
              id: 8,
              order: 7,
              title: "Список",
              type: "list",
              metadata: JSON.parse(JSON.stringify({
                type: 'symbol',
                listItems: [
                  'A adipisci dolore, enim exercitationem facere id impedit modi mollitia nesciunt odit perspiciatis quas quis rem vero vitae voluptas voluptatibus?',
                  'A adipisci dolore, enim exercitationem facere id impedit modi mollitia nesciunt odit perspiciatis quas quis rem vero vitae voluptas voluptatibus?',
                  'A adipisci dolore, enim exercitationem facere id impedit modi mollitia nesciunt odit perspiciatis quas quis rem vero vitae voluptas voluptatibus?',
                  'A adipisci dolore, enim exercitationem facere id impedit modi mollitia nesciunt odit perspiciatis quas quis rem vero vitae voluptas voluptatibus?'
                ]
              }))
            }
          ]
        }
      ]
    }
  ],
  timeline: null,
}

export const UNIVERSE_FILTERING_CATEGORIES: string[] = [
  'fantasy',
  'mystic',
  'dark fantasy',
  'horror',
  'historical',
  'post apocalypse',
  'multiple plans',
  'steam punk'
];


export interface CreateUniverse {
  id: number
}

export enum METADATA_FIELD_TYPE {
  text = 'text',
  number = 'number',
  date = 'date',
  image = 'image',
  list = 'list'
}
