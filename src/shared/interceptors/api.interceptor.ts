import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = req.url



    if(url.includes('api/')) {
      url = `${environment.baseUrl}/${url}`
      let headers = req.headers;

      const token = this.authService.getToken()

      if (token) {
        headers = headers.append('Authorization', `${token}`);
      }

      req = req.clone({url, headers});
    }



    return next.handle(req);
  }
}
