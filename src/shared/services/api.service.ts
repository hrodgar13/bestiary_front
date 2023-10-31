import { Injectable } from '@angular/core';
import {CreaturePayload} from "../../app/pages/bestiary/create-beast/create-beast.component";
import {HttpClient} from "@angular/common/http";

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
}
