import { Component } from '@angular/core';
import {Route} from "../../shared/interfaces/route.interface";
import {HEADER_ROUTES} from "../../shared/static/header-routes.static";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  routes: Route[] = HEADER_ROUTES
}
