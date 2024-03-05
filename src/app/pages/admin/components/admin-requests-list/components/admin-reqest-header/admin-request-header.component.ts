import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DEFAULT_PERPAGE} from "../../../../../../../shared/static/constants";

@Component({
  selector: 'app-admin-reqest-header',
  templateUrl: './admin-request-header.component.html',
  styleUrls: ['./admin-request-header.component.scss']
})
export class AdminRequestHeaderComponent {
  isAdminOnly = false
  @Output() adminSwitch = new EventEmitter<boolean>()

  switchToggleAdmin() {
    this.adminSwitch.emit(this.isAdminOnly)
  }
}
