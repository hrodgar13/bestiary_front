import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "../../../../shared/services/api.service";
import {Creature} from "../../../../shared/interfaces/creature/get/creature";
import {FileUpload} from "../../../../shared/interfaces/file/file-upload.interface";

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


  uploadPhoto(selectedImage: File): Observable<FileUpload> {
     return  this.apiService.uploadPhoto(selectedImage)
  }

  removePhoto(selectedImage: string): Observable<any> {
      return  this.apiService.removePhoto(selectedImage)
  }
}
