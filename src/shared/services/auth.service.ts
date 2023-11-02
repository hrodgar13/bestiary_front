import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Token, TokenDecoded} from "../interfaces/token.interface";
import {RegisterData} from "../interfaces/create-user.interface";
import {LoginInterface} from "../interfaces/login.interface";
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessToken$ = new BehaviorSubject<string | null>(null)

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
    if(access_token) {
      localStorage.setItem('auth-token', access_token)
    }

    this.accessToken$.next(access_token)

    this.access_token = access_token
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
}
