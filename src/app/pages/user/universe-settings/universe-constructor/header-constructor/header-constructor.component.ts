import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
import {UniverseTagInterface} from "../../../../../../shared/interfaces/user/universe-tag.interface";
import {TranslocoService} from "@ngneat/transloco";

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
  categories: UniverseTagInterface[] = [];
  currentLanguage: 'en' | 'ua' = 'en';
  selectedCategories: UniverseTagInterface[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly matSnack: MatSnackBar,
    private route: ActivatedRoute,
    private readonly localeService: TranslocoService,
    private readonly cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.getCategories()
    this.detectLanguageChange()
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
        this.selectedCategories = data.filterCategories ? data.filterCategories : []
      }
    })
  }

  setPhotoAlignment(alignment: 'left' | 'right') {
    this.hatPayload.imagePosition = alignment
  }

  saveHeader() {
    this.userService.createUniverseHat(this.hatPayload, this.universeId).pipe(takeUntil(this.destroyStream$)).subscribe((data: any) => {
      this.hatPayload.id = data.id

      this.matSnack.open(data.message, 'ok', {
        verticalPosition: "top",
        duration: 3000
      })
    })

    this.userService.applyTags(this.selectedCategories, this.universeId).pipe(takeUntil(this.destroyStream$)).subscribe()
  }

  setHatPayload(descriptions: UniverseStructureParagraphInterface[]) {
    this.hatPayload.description = descriptions
  }

  private detectLanguageChange() {
      this.localeService.langChanges$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        const activeLang: 'en' | 'ua' | string = data


        if(activeLang === 'en' ||activeLang === 'ua') {
          this.currentLanguage = activeLang
        }
      })
    }



  private getCategories() {
    this.userService.getUniverseFilterCategories().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.categories = data
      this.cdr.markForCheck()
    })
  }

  addCategoryToFilter($event: any) {
    const isPersist = this.selectedCategories.find(item => Number(item.id) === Number($event.id))

    if(!isPersist) {
      this.selectedCategories.push($event)
    }
  }

  removeCategoryFromFilter($event: any) {
    const itemIdx = this.selectedCategories.findIndex(item => item === $event)

    if(itemIdx !== -1) {
      this.selectedCategories.splice(itemIdx, 1)
    }
  }
}

