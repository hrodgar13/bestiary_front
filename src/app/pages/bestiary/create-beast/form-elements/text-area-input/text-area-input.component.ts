import {Component, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-text-area-input',
  templateUrl: './text-area-input.component.html',
  styleUrls: ['./text-area-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextAreaInputComponent,
    multi: true
  }]
})
export class TextAreaInputComponent implements ControlValueAccessor {
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
