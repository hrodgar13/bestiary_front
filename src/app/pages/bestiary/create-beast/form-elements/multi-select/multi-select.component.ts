import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface MultiSelect {
  value: number,
  title: string
  amount?: number,
  measure_EN?: string,
  measure_UA?: string
}

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit{
  @Input() msr = false
  @Input() amt = false
  @Input() staticMeasure!: string

  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() selectData: any[] = []
  form!: UntypedFormGroup;

  @Output() submit = new EventEmitter<Object>
  selectedItems: MultiSelect[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    const amountValidator = this.amt ? [Validators.required] : null
    const measureValidator = this.msr ? [Validators.required] : null

    this.form = this.formBuilder.group({
      value: [null, [Validators.required]],
      amount: [null, amountValidator],
      measure_EN: [null, measureValidator],
      measure_UA: [null, measureValidator]
    })
  }

  onSubmit() {
    if(this.form.invalid) {
      return
    }

    const selectedItem: MultiSelect = {
      value: this.form!.get('value')!.value,
      title: this.selectData.find(item => item.value === this.form!.get('value')?.value)?.label || '',
      amount: this.form!.get('amount')!.value,
      measure_EN: this.staticMeasure ? this.staticMeasure : this.form!.get('measure_EN')!.value,
      measure_UA: this.staticMeasure ? this.staticMeasure : this.form!.get('measure_UA')!.value
    }

    this.selectedItems.push(selectedItem)
    this.submit.emit(this.selectedItems)
  }

  removeItemFromList($event: number) {
    this.selectedItems.splice(this.selectedItems.findIndex(item => item.value === $event),1)
    this.submit.emit(this.selectedItems)
  }
}
