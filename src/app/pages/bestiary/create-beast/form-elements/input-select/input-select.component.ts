import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export interface selectorData {
  value: number
  label: string
}

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ]
})
export class InputSelectComponent implements ControlValueAccessor{
  @Input() placeholder: string = '';
  @Input() selectData: selectorData[] = [
    {
      value: 0,
      label:'Fire'
    },
    {
      value: 1,
      label:'Cold'
    },
    {
      value: 2,
      label:'Physic'
    }
  ]

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
  onInputChange(event: any) {
    const newValue = event

    if (newValue !== undefined) {
      this._value = newValue;
      this.propagateChange(this._value);
    }
  }
}
