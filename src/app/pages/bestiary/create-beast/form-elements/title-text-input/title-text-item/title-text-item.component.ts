import {Component, Input, OnInit} from '@angular/core';
import {TitleTextPayload} from "../title-text-input.component";
import {DestroySubscription} from "../../../../../../../shared/helpers/destroy-subscribtion";
import {TranslocoService} from "@ngneat/transloco";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-title-text-item',
  templateUrl: './title-text-item.component.html',
  styleUrls: ['./title-text-item.component.scss']
})
export class TitleTextItemComponent extends DestroySubscription implements OnInit{
  @Input() titleText: TitleTextPayload = {}

  currentLanguage = this.localeService.getActiveLang()

  constructor(
    private localeService: TranslocoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.detectLanguageChange()
  }

  private detectLanguageChange() {
    this.localeService.langChanges$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.currentLanguage = data
    })
  }
}
