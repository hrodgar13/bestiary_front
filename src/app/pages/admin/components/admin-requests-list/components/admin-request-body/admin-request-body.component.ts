import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RequestI} from "../../../../../../../shared/interfaces/request/request.interface";

@Component({
  selector: 'app-admin-request-body',
  templateUrl: './admin-request-body.component.html',
  styleUrls: ['./admin-request-body.component.scss']
})
export class AdminRequestBodyComponent {
  @Input() requests: RequestI[] = []
  @Input() loading: boolean = false
  @Input() total: number = 0

  @Output() paginationIncrease = new EventEmitter()
  @Output() callModal = new EventEmitter<RequestI>()
  @Output() deleteMsg = new EventEmitter<number>()
  increasePag() {
    this.paginationIncrease.emit()
  }

  openMessage(request: RequestI) {
    this.callModal.emit(request)
  }

  deleteMessage(id: number) {
    this.deleteMsg.emit(id)
  }
}
