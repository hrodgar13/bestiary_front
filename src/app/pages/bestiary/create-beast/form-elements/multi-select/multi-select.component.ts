import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateTranslationAttribute} from "../../../../../../shared/interfaces/creature/create-attribute.interface";
import {CreateAttributeMeasure} from "../../../../../../shared/interfaces/creature/create-attribute-measure.interface";

export interface MultiSelectList {
  id: number
  title: CreateTranslationAttribute
  msr: boolean
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
  @Input() alwaysUseMsr = false
  @Input() label!: string;
  @Input() placeholder: string = '';

  @Input() defaultValues: MultiSelectList[] = []

  form!: UntypedFormGroup;

  @Output() listChange = new EventEmitter<CreateAttributeMeasure[]>
  selectedItems: MultiSelectList[] = [];
  outputDataList: CreateAttributeMeasure[] = []

  selectedItemTitle!: CreateTranslationAttribute;
  @Input() unmeasuredAmount: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      value: [null, [Validators.required]],
      amount: [null],
      measure: [null]
    })

    if(this.defaultValues.length) {
      console.log(this.defaultValues)

      this.selectedItems = this.defaultValues
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    const selectedItem: MultiSelectList = {
      id: this.form!.get('value')!.value,
      title: this.selectedItemTitle,
      amt: this.form!.get('amount')!.value,
      msr: this.form!.get('measure')!.value
    }

    this.selectedItems.push(selectedItem)
    this.cdr.detectChanges()
    this.emitListPrerender()
  }

  removeItemFromList($event: number) {
    this.selectedItems.splice(this.selectedItems.findIndex(item => item.id === $event), 1)
    this.emitListPrerender()
  }

  selectedItemTitleChange(event: CreateTranslationAttribute) {
    this.selectedItemTitle = event

  }

  private emitListPrerender() {
    this.outputDataList = this.selectedItems.map(item => {
        return {
            amt: item.amt,
            msr: item.msr,
            attributeId: item.id
        }
    })

    this.listChange.emit(this.outputDataList)
  }
}
