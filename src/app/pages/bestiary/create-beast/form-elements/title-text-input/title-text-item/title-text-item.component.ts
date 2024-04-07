import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DestroySubscription} from "../../../../../../../shared/helpers/destroy-subscribtion";
import {TranslocoService} from "@ngneat/transloco";
import {takeUntil} from "rxjs";
import {ConfirmDialogComponent} from "../../../../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateActionAbility} from "../../../../../../../shared/interfaces/creature/create/create-action-ability";
import {
  EditActionAbilityComponent
} from "../../../../../../../shared/modals/edit-action-ability/edit-action-ability.component";
import {EditActionAbility} from "../../../../../../../shared/interfaces/creature/create/edit-action-ability";



@Component({
  selector: 'app-title-text-item',
  templateUrl: './title-text-item.component.html',
  styleUrls: ['./title-text-item.component.scss']
})
export class TitleTextItemComponent extends DestroySubscription implements OnInit {
  @Input() titleText!: CreateActionAbility

  currentLanguage = this.localeService.getActiveLang()
  currentLanguageTitle!: string | null;
  currentLanguageDescription!: string | null;
  @Output() remove = new EventEmitter<CreateActionAbility>
  @Output() edit = new EventEmitter<EditActionAbility>

  constructor(
    private dialog: MatDialog,
    private localeService: TranslocoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.detectLanguageChange()
  }

  private detectLanguageChange() {
    this.localeService.langChanges$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.defineCurrentLanguage(data)
    })
  }

  private defineCurrentLanguage(data: string = 'en') {
    if (data === 'en' || data === 'ua') {
      if (this.titleText.title) {
        this.currentLanguageTitle = this.titleText.title[data]
      }
      if (this.titleText.description) {
        this.currentLanguageDescription = this.titleText.description[data]
      }
    }

  }

  removeElement() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {message: 'You really wanna delete this item?'}})

    dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      if(data) {
        this.remove.emit(this.titleText)
      }
    })
  }

  editActionAbility(event: any) {
    event.stopPropagation()

    const dialogRef = this.dialog.open(EditActionAbilityComponent, {data: this.titleText, panelClass: 'edit-ability-action-modal'})

    dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe((data: CreateActionAbility) => {
      if(data) {
        this.edit.emit({new: data, old: this.titleText})
      }
    })
  }
}
