import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";
import {
  UniverseCategoryInterface,
  UniverseHatInterface,
  UniverseInterface,
  UniverseStructureParagraphInterface
} from "../../../../../../shared/interfaces/universes/universe.interface";
import {environment} from "../../../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../user.service";
import {takeUntil} from "rxjs";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-universe-body',
  templateUrl: './universe-body.component.html',
  styleUrls: ['./universe-body.component.scss']
})
export class UniverseBodyComponent extends DestroySubscription implements OnInit{
  universe!: UniverseInterface
  baseUrl: string = environment.baseUrl;
  categoryCreationMode: boolean = false;
  categoryCreateForm!: UntypedFormGroup;

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly matSnack: MatSnackBar
  ) {
    super();
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      const universeId = data['id']
      if(universeId) {
        this.detectHashedUniverse(universeId)
      }
    })

    this.categoryCreateForm = this.formBuilder.group({
      categoryName: [null, Validators.required]
    })
  }

  private getUniverse(universeId: number) {
    this.userService.getUniverseById(universeId).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.userService.universe$.next(data)
    })
  }


  sortedByOrder(information: UniverseStructureParagraphInterface[]) {
    information.sort((a, b) => a.order - b.order)

    return information
  }

  private detectHashedUniverse(universeId: number) {
    this.userService.universe$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      if(data && Number(data.id) === Number(universeId)) {
        this.universe = data
      } else {
        this.getUniverse(universeId)
      }
    })
  }

  openCloseCategoryCreationMode(status: boolean) {
    this.categoryCreationMode = status
  }

  sendCategory() {
    if(this.categoryCreateForm.invalid) {
      return
    }

    const payload: UniverseCategoryInterface = {
      title: this.categoryCreateForm.get('categoryName')?.value
    }

    this.userService.createCategory(payload, this.universe.id).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      if(data) {
        this.universe.categories?.push(data)
        this.openCloseCategoryCreationMode(false)
      }
    }, err => {
      this.matSnack.open(err.error.message, 'ok', {
        duration: 3000,
        verticalPosition: "top"
      })
    })
  }
}
