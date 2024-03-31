import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {HEADER_ROUTES} from "../../../shared/static/header-routes.static";
import {Route} from "../../../shared/interfaces/route.interface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() onSwitchDrawer = new EventEmitter<any>()
  routes: Route[] = HEADER_ROUTES;

  switchDrawer() {
    this.onSwitchDrawer.emit()
  }


}
