import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  @Output() onSwitchDrawer = new EventEmitter<any>()
  isEng: boolean = true;

  constructor(
    private translocoService: TranslocoService
  ) {
  }

  switchDrawer() {
    this.onSwitchDrawer.emit()
  }

  setOtherLang() {
    this.isEng = !this.isEng
    if(this.isEng) {
      this.translocoService.setActiveLang('en')
    } else {
      this.translocoService.setActiveLang('uk')
    }
  }
}
