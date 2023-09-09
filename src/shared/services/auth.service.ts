import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Token} from "../interfaces/token.interface";
import {RegisterData} from "../interfaces/create-user.interface";
import {LoginInterface} from "../interfaces/login.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
            localStorage.setItem('auth-token', Token.access_token)
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
            localStorage.setItem('auth-token', Token.access_token)
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
    return this.access_token = access_token
  }

  getToken(): string | null {
    return this.access_token
  }

  isAuthenticated(): boolean {
    this.getTokenFromStorage()
    return !! this.access_token
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }

  getTokenFromStorage() {
    return localStorage.getItem('auth-token') ? localStorage.getItem('auth-token') : null
  }
}
