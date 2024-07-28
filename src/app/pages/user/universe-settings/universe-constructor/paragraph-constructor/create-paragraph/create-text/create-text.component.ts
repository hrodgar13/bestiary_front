import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-create-text',
  templateUrl: './create-text.component.html',
  styleUrls: ['./create-text.component.scss']
})
export class CreateTextComponent {
  text: string = ''

  @Output() textChange = new EventEmitter<string>

  propagateText() {
    this.textChange.emit(JSON.stringify({
      description: this.text
    }))
  }
}
