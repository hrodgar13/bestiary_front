import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";
import {HEADER_ROUTES} from "../shared/static/header-routes.static";
import {Route} from "../shared/interfaces/route.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  routes: Route[] = HEADER_ROUTES
}
