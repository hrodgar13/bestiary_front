import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "../../../../shared/services/api.service";
import {CreateAttribute} from "../../../../shared/interfaces/creature/create/create-attribute";
import {Creature} from "../../../../shared/interfaces/creature/get/creature";

@Injectable()
export class CreatureService {

    constructor(
        private apiService: ApiService
    ) {
    }

    createCreature(creaturePayload: any): Observable<any> {
        return this.apiService.createCreature(creaturePayload)
    }

    patchCreature(creatureId: number, creaturePayload: any) {
        return this.apiService.patchCreature(creatureId, creaturePayload)
    }

    getCreatureById(creatureId: number): Observable<Creature> {
        return this.apiService.getCreatureById(creatureId)
    }

    createAttribute(payload: CreateAttribute) {
        return this.apiService.createAttribute(payload)
    }

    getDataForSelect(route: string) {
        return this.apiService.getDataForSelect(route)
    }
}
