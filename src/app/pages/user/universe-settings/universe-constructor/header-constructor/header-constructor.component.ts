import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";
import {UserService} from "../../../user.service";
import {takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-header-constructor',
  templateUrl: './header-constructor.component.html',
  styleUrls: ['./header-constructor.component.scss']
})
export class HeaderConstructorComponent extends DestroySubscription implements OnInit{
  lastLoaded: string = '';
  uploadedImages: string[] = []
  baseUrl: string = environment.baseUrl;

  constructor(
    private readonly userService: UserService,
    private readonly matSnack: MatSnackBar
  ) {
    super();
  }

  ngOnInit() {
  }

  addFileToList($event: string) {
    this.uploadedImages.push($event)
  }

  deleteImageFromUpload(imageName: string) {
    const idx = this.uploadedImages.indexOf(imageName)

    if(idx !== -1) {

      this.userService.removePhoto(imageName).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        this.uploadedImages.splice(idx, 1)
      }, err => {
        this.matSnack.open(err.error.message, 'ok', {
          duration: 3000,
          verticalPosition: "top"
        })
      })
    }
  }
}
