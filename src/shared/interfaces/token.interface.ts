export interface Token {
  readonly access_token: string
}

export interface TokenDecoded{
  id: number

  email: string

  role: string
}
