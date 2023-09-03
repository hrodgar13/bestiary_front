import { Component } from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-switch-lang',
  templateUrl: './switch-lang.component.html',
  styleUrls: ['./switch-lang.component.scss']
})
export class SwitchLangComponent {
  isEng: boolean = true;

  constructor(
    readonly translocoService: TranslocoService
  ) {
  }

  setOtherLang() {
    this.isEng = !this.isEng

    if (this.isEng) {
      this.translocoService.setActiveLang('en')
    } else {
      this.translocoService.setActiveLang('uk')
    }
  }
}
