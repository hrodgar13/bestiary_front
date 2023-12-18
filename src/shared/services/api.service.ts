import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {CreateAttribute} from "../interfaces/creature/create/create-attribute";
import {Creature} from "../interfaces/creature/get/creature";
import {Attributes} from "../static/creature/attributes.code";
import {Attribute} from "../interfaces/creature/get/attribute";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) {
    }

    createCreature(creaturePayload: any) {
        return this.http.post(`api/creature`, creaturePayload);
    }

    getCreaturesList(filter: any[]): Observable<any[]> {
        const params: HttpParams = this.transformArrayInParams(filter)
        return this.http.get<any[]>(`api/creature`, {params});
    }

    getCreatureById(id: number): Observable<Creature> {
        return this.http.get<Creature>(`api/creature/${id}`)
    }

    patchCreature(creatureId: number, creaturePayload: any) {
        return this.http.patch(`api/creature/${creatureId}`, creaturePayload)
    }

    getUnfinishedCreatures() {
        return this.http.get<any[]>(`api/creature-unfinished`);
    }

    // getAttributes(key: string): Observable<FilterLabelValues[]> {
    //   return this.http.get<FilterLabelValues[]>(`api/${key}`)
    // }
    //
    private transformArrayInParams(filter: any[]): HttpParams {
        return filter
            .reduce((params, key) => {

                if (key.ids.length !== null) {
                    return params.set(key.attributeName, key.ids.toString());
                }
                return params;
            }, new HttpParams())
    }

    createAttribute(payload: CreateAttribute) {
        return this.http.post(`api/attribute`, payload)
    }

    getDataForSelect(route: string): Observable<Attribute[]> {
        return this.http.get<Attribute[]>(`api/attribute/route`)
    }
}
