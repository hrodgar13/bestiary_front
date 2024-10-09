import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";
import {
  UniverseCategoryInterface,
  UniverseHatInterface,
  UniverseInterface,
  UniverseStructureParagraphInterface
} from "../../../../../../shared/interfaces/universes/universe.interface";
import {environment} from "../../../../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../user.service";
import {takeUntil} from "rxjs";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogComponent} from "../../../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

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
  editingModeEnabled = false

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly matSnack: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly router: Router
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

    this.detectEditingModeStatus()
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

  private detectEditingModeStatus() {
    this.userService.editMode$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.editingModeEnabled = data
      console.log(data)
    })
  }

  deleteCategory($event: number) {
    const idx = this.universe.categories?.findIndex(item => item.id === $event)

    if(idx && idx !== -1) {
      this.universe.categories?.splice(idx, 1)
    }
  }

  deleteUniverse() {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: 'Oh, is this the end? The universe will be deleted'
        }
      })

      dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        if (data) {
          this.processDeleteUniverse()
        }
      })

  }
  private processDeleteUniverse() {
    this.userService.deleteUniverse(this.universe.id).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.matSnack.open('Universe Deleted!', 'ok', {
        verticalPosition: "top",
        duration: 3000,
      })

      this.router.navigate(['../user/universes'])
    }, (err) => {
      this.matSnack.open(err.error.message, 'ok', {
        verticalPosition: "top",
        duration: 3000,
      })
    })
  }
}
