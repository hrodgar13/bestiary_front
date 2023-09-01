import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";

interface Route {
  route: string;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  @ViewChild('languageSwitch', {read: ElementRef}) element: ElementRef | undefined;

  isEng: boolean = true;

  constructor(
    private translocoService: TranslocoService
  ) {
  }

  routes: Route[] = [
    {
      title: 'Home',
      route: ''
    },
    {
      title: 'Bestiary',
      route: 'bestiary'
    },
    {
      title: 'Classes',
      route: 'classes'
    },
    {
      title: 'Races',
      route: 'races'
    },
    {
      title: 'Equipment',
      route: 'equipment'
    },
  ]

  setOtherLang() {
    this.isEng = !this.isEng

    if (this.isEng) {
      this.translocoService.setActiveLang('en')
    } else {
      this.translocoService.setActiveLang('uk')
    }
  }
}
