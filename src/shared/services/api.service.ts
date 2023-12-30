import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateAttribute} from "../interfaces/creature/create/create-attribute";
import {Creature} from "../interfaces/creature/get/creature";
import {Attribute} from "../interfaces/creature/get/attribute";
import {CreatureListFilter} from "../interfaces/filters/creature-list-filter";
import {
  FilteredCreatureDataMetaDto,
  FilteredCreatureList,
  FilteredCreatureListItem
} from "../interfaces/filters/creatures.list";
import {OutputCreatureItem} from "../interfaces/filters/output-creature-item";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) {
    }

    createCreature(creaturePayload: any): Observable<Creature> {
        return this.http.post<Creature>(`api/creature`, creaturePayload);
    }

    getCreaturesList(filter: CreatureListFilter[], search: string, perPage: number, finished?: string): Observable<FilteredCreatureDataMetaDto> {
        let params: HttpParams = this.transformArrayInParams(filter)

        if (finished) {
            params = params.set('finished', finished)
        }

        params = params.set('search', search)
          .set('perPage', perPage)

        return this.http.get<FilteredCreatureDataMetaDto>(`api/creature/list`, {params});
    }

    getCreatureById(id: number): Observable<Creature> {
        return this.http.get<Creature>(`api/creature/list/${id}`)
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
    private transformArrayInParams(filter: CreatureListFilter[]): HttpParams {
        return filter
            .reduce((params, key) => {

                return params.set(key.filter_cat, key.filter_values.map(item => item.id).toString());
            }, new HttpParams())
    }

    createAttribute(payload: CreateAttribute) {
        return this.http.post(`api/attribute`, payload)
    }

    getDataForSelect(route: string): Observable<Attribute[]> {
        return this.http.get<Attribute[]>(`api/attribute/${route}`)
    }

    getFilters(): Observable<CreatureListFilter[]> {
        return this.http.get<CreatureListFilter[]>(`api/attribute`)
    }
}
