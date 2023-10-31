import { Injectable } from '@angular/core';
import {CreaturePayload} from "./create-beast.component";
import {Observable} from "rxjs";
import {ApiService} from "../../../../shared/services/api.service";

@Injectable()
export class CreatureService {

  constructor(
    private apiService: ApiService
  ) { }

  createCreature(creaturePayload: CreaturePayload): Observable<any> {
    return this.apiService.createCreature(creaturePayload)
  }
}
