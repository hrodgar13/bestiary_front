export interface UserProfile {
  id: number
  avatarUrl?: string
  name?: string
  email: string
  dateOfCreation: Date
  subscription: DungeonMasterSubscription
  dateOfExpireSub?: Date
}

export const MOCK_USER_PROFILE: UserProfile = {
  id: 0,
  dateOfCreation: new Date(),
  avatarUrl: 'fbf548f3-63d9-47f9-92a2-ab5db50f9272-eafca6af9e30b2998e41301a00e9abdd.jpg',
  email: 'ermackov2003@gmail.com',
  dateOfExpireSub: new Date(),
  subscription: {
    id: 0,
    type: 'The Adventurer',
    subPhotoUrl: ''
  }
}


export interface DungeonMasterSubscription {
  id: number,
  type: string
  subPhotoUrl: string
}

export interface UpdateProfileDto {
  avatarUrl?: string
  name?: string
}
