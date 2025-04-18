import {Injectable} from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {BehaviorSubject, Observable} from "rxjs";
import {
  CreateUniverse,
  MOCK_UNIVERSE, UniverseCategoryInterface, UniverseCategoryInterfaceMeta, UniverseCategoryItem, UniverseHatInterface,
  UniverseInterface,
  UniverseListItem
} from "../../../shared/interfaces/universes/universe.interface";
import {UniverseTagInterface} from "../../../shared/interfaces/user/universe-tag.interface";

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

  getUniverseFilterCategories(): Observable<UniverseTagInterface[]> {
    return this.apiService.getUniverseTags()
  }

  getUniverses(name: string, categories: UniverseTagInterface[]): Observable<UniverseListItem[]> {
    return this.apiService.getUniverses(name, categories)
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

  deleteCategory(categoryId: number) {
    return this.apiService.deleteCategory(categoryId)
  }

  deleteUniverse(id: number) {
    return this.apiService.deleteUniverse(id)
  }

  applyTags(selectedCategories: UniverseTagInterface[], universeId: number) {
    let selectedTagsIds: number[] = []
    selectedCategories.map(item => {
      if(item.id) {
        selectedTagsIds.push(item.id)
      }
    })

    return this.apiService.applyTags(selectedTagsIds, universeId)
  }
}
