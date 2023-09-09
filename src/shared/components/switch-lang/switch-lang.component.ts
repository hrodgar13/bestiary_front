import { Component } from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-switch-lang',
  templateUrl: './switch-lang.component.html',
  styleUrls: ['./switch-lang.component.scss']
})
export class SwitchLangComponent {
  showMenu = false
  selected = 'en';

  constructor(
    readonly translocoService: TranslocoService
  ) {
  }

  setOtherLang(lang: any) {
      this.translocoService.setActiveLang(lang.value)
  }
}
