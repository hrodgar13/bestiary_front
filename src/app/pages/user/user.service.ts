import { Injectable } from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  constructor(
    private readonly apiService: ApiService
  ) { }

  uploadAvatar(selectedImage: File) {
    return this.apiService.uploadPhoto(selectedImage)
  }

  removePhoto(selectedImage: string): Observable<any> {
    return  this.apiService.removePhoto(selectedImage)
  }

}
