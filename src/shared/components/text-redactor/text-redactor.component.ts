import {Component, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-text-redactor',
  templateUrl: './text-redactor.component.html',
  styleUrls: ['./text-redactor.component.scss']
})
export class TextRedactorComponent{

  window = window

  formatText() {
    const selectedText = window.getSelection()?.toString();

    if(!selectedText) {
      return
    }

    console.log(selectedText)
  }
}
