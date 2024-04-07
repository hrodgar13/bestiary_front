import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-statblock-input',
  templateUrl: './statblock-input.component.html',
  styleUrls: ['./statblock-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatblockInputComponent),
      multi: true
    }
  ]
})
export class StatblockInputComponent implements ControlValueAccessor {
  @Input() label: any;

  @Output() detectCharacteristicChange = new EventEmitter<number>()

  _value: any;

  constructor(
    private matSnack: MatSnackBar
  ) {
  }

  private propagateChange = (_: any) => {
  };

  writeValue(value: any) {
    this._value = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  onInputChange(event: any) {
    let newValue = event

    if (newValue !== undefined) {
      if (newValue > 30) {
        this.matSnack.open('Палич, ти шо йобнувся?', 'Емм, ні', {
          duration: 3000,
          verticalPosition: "top"
        })
        newValue = 30
      }

      if (newValue < 0) {
        newValue = 0
      }


      this._value = newValue;
      this.propagateChange(this._value);
      this.detectCharacteristicChange.emit(Number(newValue) || 0)
    }
  }
}
