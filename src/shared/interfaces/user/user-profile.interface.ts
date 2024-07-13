export interface UserProfile {
  id: number
  avatarUrl?: string
  name?: string
  email: string
  dateOfCreation: Date
  subscription: DungeonMasterSubscription
}

export const MOCK_USER_PROFILE: UserProfile = {
  id: 0,
  dateOfCreation: new Date(),
  avatarUrl: 'https://i.pinimg.com/564x/07/cd/8e/07cd8e3e3b085f93557fcdf499974866.jpg',
  email: 'ermackov2003@gmail.com',
  subscription: {
    id: 0,
    type: 'The Adventurer',
    dateOfExpire: new Date()
  }
}


export interface DungeonMasterSubscription {
  id: number,
  type: string
  dateOfExpire: Date
}
