import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RequestI} from "../../../../../../../../shared/interfaces/request/request.interface";

@Component({
  selector: 'app-admin-request-item',
  templateUrl: './admin-request-item.component.html',
  styleUrls: ['./admin-request-item.component.scss']
})
export class AdminRequestItemComponent {
  @Input() request!: RequestI;

  @Output() deleteMsg = new EventEmitter<number>()
  deleteMessage(id: number, $event: Event) {
    if ($event) {
      $event.stopPropagation()
    }

    this.deleteMsg.emit(id)
  }
}
