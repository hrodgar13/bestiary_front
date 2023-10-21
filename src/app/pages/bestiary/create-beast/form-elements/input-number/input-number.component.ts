import {Component, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputNumberComponent,
    multi: true
  }]
})
export class InputNumberComponent implements ControlValueAccessor {
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
