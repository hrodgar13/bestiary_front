import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateTranslationAttribute} from "../../../../../../shared/interfaces/creature/create-attribute.interface";

export interface MultiSelect {
  id: number
  title: CreateTranslationAttribute
  msr: CreateTranslationAttribute
  amt: number
}

export interface OutputMultiSelectData {
  id: number
  title: CreateTranslationAttribute
  msr: CreateTranslationAttribute
  amt: number
}

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  @Input() route = ''
  @Input() amt = false
  @Input() msr: boolean = true
  @Input() staticMeasure!: CreateTranslationAttribute

  @Input() label!: string;
  @Input() placeholder: string = '';
  form!: UntypedFormGroup;

  @Output() listChange = new EventEmitter<OutputMultiSelectData[]>
  selectedItems: MultiSelect[] = [];
  selectedItemTitle!: CreateTranslationAttribute;
  @Input() unmeasuredAmount: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    const amountValidator = this.amt ? [Validators.required] : null
    const measureValidator = !!this.staticMeasure ? [Validators.required] : null

    this.form = this.formBuilder.group({
      value: [null, [Validators.required]],
      amount: [null, amountValidator],
      measure_EN: [this.staticMeasure ? this.staticMeasure.en : null, measureValidator],
      measure_UA: [this.staticMeasure ? this.staticMeasure.ua : null, measureValidator]
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    const selectedItem: MultiSelect = {
      id: this.form!.get('value')!.value,
      title: this.selectedItemTitle,
      amt: this.form!.get('amount')!.value,
      msr: {
        en: this.staticMeasure ? this.staticMeasure['en'] : this.form!.get('measure_EN')!.value,
        ua: this.staticMeasure ? this.staticMeasure['ua'] : this.form!.get('measure_UA')!.value
      }
    }

    this.selectedItems.push(selectedItem)
    this.listChange.emit(this.selectedItems)
  }

  removeItemFromList($event: number) {
    this.selectedItems.splice(this.selectedItems.findIndex(item => item.id === $event), 1)
    this.listChange.emit(this.selectedItems)
  }

  selectedItemTitleChange(event: CreateTranslationAttribute) {
    this.selectedItemTitle = event
  }
}
