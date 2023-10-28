import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TitleTextPayload} from "../title-text-input.component";
import {DestroySubscription} from "../../../../../../../shared/helpers/destroy-subscribtion";
import {TranslocoService} from "@ngneat/transloco";
import {takeUntil} from "rxjs";
import {ConfirmDialogComponent} from "../../../../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-title-text-item',
  templateUrl: './title-text-item.component.html',
  styleUrls: ['./title-text-item.component.scss']
})
export class TitleTextItemComponent extends DestroySubscription implements OnInit {
  @Input() titleText: TitleTextPayload = {}

  currentLanguage = this.localeService.getActiveLang()
  currentLanguageTitle!: string;
  currentLanguageDescription!: string;
  @Output() remove = new EventEmitter<TitleTextPayload>

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
}
