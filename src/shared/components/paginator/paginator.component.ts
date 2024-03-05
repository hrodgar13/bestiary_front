import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() loading: boolean = false

  @Output() increasePagination = new EventEmitter()

  increasePag() {
    this.increasePagination.emit()
  }
}
