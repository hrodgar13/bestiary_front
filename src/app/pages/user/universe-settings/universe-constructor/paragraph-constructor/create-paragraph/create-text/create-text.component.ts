import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-create-text',
  templateUrl: './create-text.component.html',
  styleUrls: ['./create-text.component.scss']
})
export class CreateTextComponent implements OnInit, OnChanges{
  text: string = ''

  @Input() initMetadata: JSON = JSON.parse('{"description": ""}')

  @Output() sendData = new EventEmitter<string>

  ngOnInit() {
    this.initVariables()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initMetadata']) {
      this.initVariables();
    }
  }

  initVariables() {
    const initMeta = JSON.parse(JSON.stringify(this.initMetadata))
    this.text = initMeta.description
  }

  propagateText() {
    this.sendData.emit(JSON.stringify({
      description: this.text
    }))
  }
}
