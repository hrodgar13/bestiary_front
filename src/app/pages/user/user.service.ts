import {Injectable} from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {BehaviorSubject, Observable} from "rxjs";
import {
  CreateUniverse,
  MOCK_UNIVERSE, UniverseCategoryInterface, UniverseCategoryInterfaceMeta, UniverseCategoryItem, UniverseHatInterface,
  UniverseInterface,
  UniverseListItem
} from "../../../shared/interfaces/universes/universe.interface";

@Injectable()
export class UserService {

  universe$ = new BehaviorSubject<UniverseInterface | null>(null)
  editMode$ = new BehaviorSubject<boolean>(localStorage.getItem('editingMode') === 'true');
  universeCategories$ = new BehaviorSubject<UniverseCategoryInterfaceMeta[] | null>(null);

  constructor(
    private readonly apiService: ApiService
  ) {
  }

  uploadAvatar(selectedImage: File) {
    return this.apiService.uploadPhoto(selectedImage)
  }

  removePhoto(selectedImage: string): Observable<any> {
    return this.apiService.removePhoto(selectedImage)
  }

  getUniverseFilterCategories(): Observable<string[]> {
    return this.apiService.getUniverseFilterCategories()
  }

  getUniverses(): Observable<UniverseListItem[]> {
    return this.apiService.getUniverses()
  }

  getUniverseById(universeId: number) {
    return this.apiService.getUniverseById(universeId)
  }

  createUniverse(): Observable<CreateUniverse> {
    return this.apiService.createUniverse()
  }

  createUniverseHat(hatPayload: UniverseHatInterface, universeId: number) {
    return this.apiService.updateUniverseHat(hatPayload, universeId)
  }

  createCategory(payload: UniverseCategoryInterface, universeId: number) {
    return this.apiService.createCategory(payload, universeId)
  }

  createCategoryItem(payload: UniverseCategoryItem, universeId: number, categoryId: number) {
    return this.apiService.createCategoryItem(payload, universeId, categoryId)
  }

  getCategoryItems(universeId: number, categoryId: number, page: number, title: string) {
    return this.apiService.getCategoryItems(universeId, categoryId, page, title)
  }

  getCategoryItemById(universeId: number, categoryId: number, itemId: number): Observable<UniverseCategoryItem> {
    return this.apiService.getCategoryItemById(universeId, categoryId, itemId)
  }

  deleteCategoryItem(itemId: number) {
    return this.apiService.deleteCategoryItem(itemId)
  }
}
