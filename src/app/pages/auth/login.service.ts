import { Injectable } from '@angular/core';
import {LoginInterface} from "../../../shared/interfaces/user/login.interface";
import {AuthService} from "../../../shared/services/auth.service";
import {Observable} from "rxjs";
import {Token} from "../../../shared/interfaces/user/token.interface";
import {Register} from "../../../shared/interfaces/user/register.interface";

@Injectable()
export class LoginService {

  constructor(
    private authService: AuthService
  ) { }

  login(payload: LoginInterface): Observable<Token> {
    return this.authService.login(payload)
  }

  register(payload: Register): Observable<Token> {
    return this.authService.register(payload)
  }
}
