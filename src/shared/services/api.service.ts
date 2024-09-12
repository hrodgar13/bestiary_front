import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {CreateAttribute} from "../interfaces/creature/create/create-attribute";
import {Creature} from "../interfaces/creature/get/creature";
import {Attribute} from "../interfaces/creature/get/attribute";
import {CreatureListFilter} from "../interfaces/filters/creature-list-filter";
import {
  FilteredCreatureDataMetaDto,
} from "../interfaces/filters/creatures.list";
import {FileUpload} from "../interfaces/file/file-upload.interface";
import {MessageI} from "../interfaces/message.interface";
import {Translation} from "@ngneat/transloco";
import {CreateRequest} from "../interfaces/request/create-request.interface";
import {RequestDataMetaI} from "../interfaces/request/request.data-meta.interface";
import {
  CreateUniverse,
  MOCK_UNIVERSE,
  MOCK_UNIVERSE_LIST,
  UNIVERSE_FILTERING_CATEGORIES,
  UniverseCategoryInterface,
  UniverseCategoryInterfaceMeta,
  UniverseCategoryItem,
  UniverseHatInterface,
  UniverseInterface,
  UniverseListItem
} from "../interfaces/universes/universe.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  greenBtnChange$ = new BehaviorSubject<string>('')

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

  createAttribute(payload: CreateAttribute): Observable<Attribute> {
    return this.http.post<Attribute>(`api/attribute`, payload)
  }

  getDataForSelect(route: string): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(`api/attribute/${route}`)
  }

  getFilters(): Observable<CreatureListFilter[]> {
    return this.http.get<CreatureListFilter[]>(`api/attribute`)
  }

  uploadPhoto(file: File): Observable<FileUpload> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<FileUpload>('api/file-upload', formData);
  }

  removePhoto(selectedImage: string) {
    return this.http.delete<any>(`api/file-upload/remove/${selectedImage}`);
  }

  deleteFilter(id: number) {
    return this.http.delete<MessageI>(`api/attribute/${id}`)
  }

  editAttribute(payload: Translation, id: number): Observable<Attribute> {
    return this.http.patch<Attribute>(`api/attribute/${id}`, payload)
  }

  sendMessage(payload: CreateRequest): Observable<MessageI> {
    return this.http.post<MessageI>(`api/message`, payload)
  }

  getReqList(perPage: number, onlyAdminRequest: boolean = false): Observable<RequestDataMetaI> {

    const params: HttpParams = new HttpParams()
      .set('onlyAdminRequest', onlyAdminRequest)
      .set('perPage', perPage)

    return this.http.get<RequestDataMetaI>(`api/message/list`, {params})
  }

  deleteMessage(id: number): Observable<MessageI> {
    return this.http.delete<MessageI>(`api/message/${id}`)
  }

  changeReadStatus(id: number) {
    return this.http.patch(`api/message/read/${id}`, {})
  }

  setAsAdmin(id: number): Observable<MessageI> {
    return this.http.patch<MessageI>(`api/auth/role/admin/${id}`, {})
  }

  private transformArrayInParams(filter: CreatureListFilter[]): HttpParams {
    return filter
      .reduce((params, key) => {

        return params.set(key.filter_cat, key.filter_values.map(item => item.id).toString());
      }, new HttpParams())
  }

  deleteActionAbility(id: number): Observable<MessageI> {
    return this.http.delete<MessageI>(`api/creature/action-ability/${id}`);
  }

  getUniverseFilterCategories() {
    return of(UNIVERSE_FILTERING_CATEGORIES);
  }

  getUniverses(): Observable<UniverseListItem[]> {
    return this.http.get<UniverseListItem[]>(`api/settings/universe-list`);
  }

  getUniverseById(universeId: number): Observable<UniverseInterface> {
    return this.http.get<UniverseInterface>(`api/settings/universe/${universeId}`)
  }

  createUniverse(): Observable<CreateUniverse> {
    return this.http.post<CreateUniverse>(`api/settings/universe`, {})
  }

  updateUniverseHat(hatPayload: UniverseHatInterface, universeId: number) {
    return this.http.post(`api/settings/universe/${universeId}/hat`, hatPayload)
  }

  createCategory(payload: UniverseCategoryInterface, universeId: number): Observable<UniverseCategoryInterface> {
    return this.http.post<UniverseCategoryInterface>(`api/settings/universe/${universeId}/category`, payload)
  }

  createCategoryItem(payload: UniverseCategoryItem, universeId: number, categoryId: number): Observable<UniverseCategoryItem> {
    return this.http.post<UniverseCategoryItem>(`api/settings/universe/${universeId}/category/${categoryId}/item`, payload)
  }

  getCategoryItems(universeId: number, categoryId: number, page: number, title: string): Observable<UniverseCategoryInterfaceMeta> {
    const params: HttpParams = new HttpParams()
      .set('title', title)
      .set('page', page)

    return this.http.get<UniverseCategoryInterfaceMeta>(`api/settings/universe/${universeId}/category/${categoryId}`, {params})
  }

  getCategoryItemById(universeId: number, categoryId: number, itemId: number): Observable<UniverseCategoryItem> {
    return this.http.get<UniverseCategoryItem>(`api/settings/universe/${universeId}/category/${categoryId}/item/${itemId}`)
  }
}
