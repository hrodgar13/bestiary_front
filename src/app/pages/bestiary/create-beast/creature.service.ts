import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "../../../../shared/services/api.service";
import {CreaturePayload} from "../../../../shared/interfaces/creature/create-update/creature-payload.interface";

@Injectable()
export class CreatureService {

  constructor(
    private apiService: ApiService
  ) { }

  createCreature(creaturePayload: CreaturePayload): Observable<any> {
    return this.apiService.createCreature(creaturePayload)
  }

  patchCreature(creatureId: number, creaturePayload: CreaturePayload) {
    return this.apiService.patchCreature(creatureId, creaturePayload)
  }

  getCreatureById(creatureId: number) {
    return this.apiService.getCreatureById(creatureId)
  }
}
