import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";
import {UserService} from "../../../user.service";
import {takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../../../../../environments/environment";
import {
  UniverseHatInterface,
  UniverseStructureParagraphInterface
} from "../../../../../../shared/interfaces/universes/universe.interface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header-constructor',
  templateUrl: './header-constructor.component.html',
  styleUrls: ['./header-constructor.component.scss']
})
export class HeaderConstructorComponent extends DestroySubscription implements OnInit{
  lastLoaded: string = '';
  hatPayload: UniverseHatInterface = {
    images: [],
    universeName: '',
    description: [],
    imagePosition: "right"
  }
  baseUrl: string = environment.baseUrl;
  universeId: number = 0
  loading = true;

  constructor(
    private readonly userService: UserService,
    private readonly matSnack: MatSnackBar,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.getUniverseId()
  }

  addFileToList($event: { url: string, width: number, height: number }) {
    this.hatPayload.images.push($event.url)
  }

  deleteImageFromUpload(imageName: string) {
    const idx = this.hatPayload.images.indexOf(imageName)

    if(idx !== -1) {

      this.userService.removePhoto(imageName).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        this.hatPayload.images.splice(idx, 1)
      }, err => {
        this.matSnack.open(err.error.message, 'ok', {
          duration: 3000,
          verticalPosition: "top"
        })
      })
    }
  }

  private getUniverseId() {
    this.route.params.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      const id = data['id']
      if(id) {
        this.universeId = id
        this.getHatFromHashedUniverse(id)
      }
    })
  }

  private getHatFromHashedUniverse(id: number) {
    this.userService.universe$.pipe(takeUntil(this.destroyStream$)).subscribe(universe => {
      if(universe && Number(universe.id) === Number(id)) {

        if(universe.hat) {
          this.hatPayload = universe.hat
        }
      } else {
        this.getUniverseById(id)
      }
      this.loading = false
    }, error => {
      this.loading = false
    })
  }

  private getUniverseById(id: number) {
    this.userService.getUniverseById(id).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      if(data) {
        this.userService.universe$.next(data)
      }
    })
  }

  setPhotoAlignment(alignment: 'left' | 'right') {
    this.hatPayload.imagePosition = alignment
  }

  saveHeader() {
    this.userService.createUniverseHat(this.hatPayload, this.universeId).pipe(takeUntil(this.destroyStream$)).subscribe(data => {

    })
  }

  setHatPayload(descriptions: UniverseStructureParagraphInterface[]) {
    this.hatPayload.description = descriptions
  }
}
