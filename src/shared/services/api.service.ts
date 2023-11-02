import { Injectable } from '@angular/core';
import {CreaturePayload} from "../../app/pages/bestiary/create-beast/create-beast.component";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreatureListItem} from "../../app/pages/bestiary/bestiary-list/bestiary-list.component";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  createCreature(creaturePayload: CreaturePayload) {
    return this.http.post(`api/creature`, creaturePayload);
  }

  getCreaturesList(): Observable<CreatureListItem[]> {
    return this.http.get<CreatureListItem[]>(`api/creature`);
  }

  getCreatureById(id: number) {
    return this.http.get<any>(`api/creature/${id}`)
  }
}
