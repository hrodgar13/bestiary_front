import { Injectable } from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {BehaviorSubject, Observable} from "rxjs";
import {
  CreateUniverse,
  MOCK_UNIVERSE, UniverseHatInterface,
  UniverseInterface,
  UniverseListItem
} from "../../../shared/interfaces/universes/universe.interface";

@Injectable()
export class UserService {

  universe$ = new BehaviorSubject<UniverseInterface | null>(null)

  constructor(
    private readonly apiService: ApiService
  ) { }

  uploadAvatar(selectedImage: File) {
    return this.apiService.uploadPhoto(selectedImage)
  }

  removePhoto(selectedImage: string): Observable<any> {
    return  this.apiService.removePhoto(selectedImage)
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
}
