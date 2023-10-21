import {Component, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export interface KeyValue {
  key: string
  value: any
}

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputTextComponent,
    multi: true
  }]
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';

  _value: any;

  private propagateChange = (_: any) => {
  };

  writeValue(value: any) {
    this._value = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
  onInputChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.propagateChange(newValue);
  }

}
