import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DestroySubscription} from "../../../helpers/destroy-subscribtion";
import {environment} from "../../../../environments/environment";
import {CreatureService} from "../../../../app/pages/bestiary/create-beast/creature.service";
import {ApiService} from "../../../services/api.service";


@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent extends DestroySubscription{

  @Input() currentImage: string | null = null
  @Input() removeLastUploaded = true
  @Output() fileLoaded = new EventEmitter<{url: string, width: number, height: number}>()
  selectedImage: File | null = null
  baseUrl: string = environment.baseUrl;
  base64Image: string | null = null;

  constructor(
    private apiService: ApiService,
    private matSnack: MatSnackBar
  ) {
    super();
  }

  loadFile(event: any) {
    this.selectedImage = event.target.files[0] as File;

    if (this.selectedImage) {
      const reader = new FileReader();

      reader.onload = () => {
        this.base64Image = reader.result as string;

        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;

          this.uploadImage(width, height);
        };
        img.src = this.base64Image;
      };

      reader.readAsDataURL(this.selectedImage);
    }
  }

  uploadImage(width: number, height: number): void {
    if (!this.selectedImage) {
      return;
    }

    if(this.removeLastUploaded) {
      this.removeOldPhoto()
    }

    this.apiService.uploadPhoto(this.selectedImage).pipe(takeUntil(this.destroyStream$)).subscribe(
      (data) => {
        this.matSnack.open('File upload', '', {
          duration: 3000,
          verticalPosition: "top"
        });
        this.currentImage = data.fileName;
        this.fileLoaded.emit({url: this.currentImage, width, height})
      },
      (error) => {
        this.matSnack.open(error.error.message, '', {
          duration: 3000,
          verticalPosition: "top"
        });
        this.base64Image = null;
      }
    );

  }

  private removeOldPhoto() {
    if(this.currentImage) {
      this.apiService.removePhoto(this.currentImage).pipe(takeUntil(this.destroyStream$)).subscribe(data => {

      })
    }
  }
}
