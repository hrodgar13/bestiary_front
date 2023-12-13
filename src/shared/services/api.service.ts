import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreatureListItem} from "../../app/pages/bestiary/bestiary-list/bestiary-list.component";
import {Creature} from "../../app/pages/bestiary/beast-page/beast-page.component";
import {CreaturePayload} from "../interfaces/creature/create-update/creature-payload.interface";

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

  getCreatureById(id: number): Observable<Creature> {
    return this.http.get<any>(`api/creature/${id}`)
  }

  patchCreature(creatureId: number, creaturePayload: CreaturePayload) {
    return this.http.patch(`api/creature/${creatureId}`, creaturePayload)
  }

  getUnfinishedCreatures() {
    return this.http.get<CreatureListItem[]>(`api/creature-unfinished`);
  }
}
