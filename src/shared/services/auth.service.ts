import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Token, TokenDecoded} from "../interfaces/user/token.interface";
import {RegisterData} from "../interfaces/user/create-user.interface";
import {LoginInterface} from "../interfaces/user/login.interface";
import jwt_decode from 'jwt-decode'
import {MOCK_USER_PROFILE, UserProfile} from "../interfaces/user/user-profile.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessToken$ = new BehaviorSubject<string | null>(localStorage.getItem('auth-token') ? localStorage.getItem('auth-token') : null)

  private access_token: string | null = null

  constructor(
    private readonly http: HttpClient
  ) {
    this.access_token = this.getTokenFromStorage()
  }

  login(payload: LoginInterface) {
    return this.http.post<Token>('api/auth/signin', payload).pipe(
      tap(
        (
          (Token) => {
            this.setToken(Token.access_token)
          }
        )
      )
    )
  }

  public register(payload: RegisterData): Observable<Token> {
    return this.http.post<Token>('api/auth/signup',  payload).pipe(
      tap(
        (
          (Token) => {
            this.setToken(Token.access_token)
          }
        )
      )
    )
  }

  setToken(access_token: string | null) {
    this.access_token = access_token

    if(access_token) {
      localStorage.setItem('auth-token', access_token)
    }

    this.accessToken$.next(access_token)
  }

  getToken(): string | null {
    return this.access_token
  }

  isAuthenticated(): boolean {
    this.access_token = this.getTokenFromStorage()

    return !! this.access_token
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }

  getTokenFromStorage() {
    return localStorage.getItem('auth-token') ? localStorage.getItem('auth-token') : null
  }

  isAdminAuthenticated() {
    if(this.access_token) {
      const user: TokenDecoded = jwt_decode(this.access_token)
      //TODO change this if wi will increase amount of roles
      return user.role === 'ADMIN'
    }

    return false
  }

  getUserInfo() : UserProfile {
    return MOCK_USER_PROFILE
  }
}
