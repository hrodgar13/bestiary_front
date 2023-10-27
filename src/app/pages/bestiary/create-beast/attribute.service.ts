import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateTranslationAttribute} from "../../../../shared/interfaces/creature/create-attribute.interface";

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(
    private http: HttpClient
  ) { }

  createAttribute(route: string, payload: CreateTranslationAttribute): Observable<any> {
    return this.http.post(`api/${route}`, {[route]: payload})
  }

  getDataForSelect(route: string): Observable<any> {
    return this.http.get(`api/${route}`)
  }
}