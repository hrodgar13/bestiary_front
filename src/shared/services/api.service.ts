import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {CreatureListItem} from "../../app/pages/bestiary/bestiary-list/bestiary-list.component";
import {Creature} from "../../app/pages/bestiary/beast-page/beast-page.component";
import {CreaturePayload} from "../interfaces/creature/create-update/creature-payload.interface";
import {CreatureFilterInterface, FilterLabel, FilterLabelValues} from "../interfaces/filter/creature-filter.interface";

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

  getCreaturesList(filter: CreatureFilterInterface[]): Observable<CreatureListItem[]> {
    const params: HttpParams = this.transformArrayInParams(filter)
    return this.http.get<CreatureListItem[]>(`api/creature`, {params});
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

  getAttributes(key: string): Observable<FilterLabelValues[]> {
    return this.http.get<FilterLabelValues[]>(`api/${key}`)
  }

  private transformArrayInParams(filter: CreatureFilterInterface[]): HttpParams {
    return filter
      .reduce((params, key) => {

        if (key.ids.length !== null) {
          return params.set(key.attributeName, key.ids.toString());
        }
        return params;
      }, new HttpParams())
  }
}
