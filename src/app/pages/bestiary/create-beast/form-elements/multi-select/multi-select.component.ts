import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Attributes} from "../../../../../../shared/static/creature/attributes.code";
import {FormBuilder, UntypedFormGroup} from "@angular/forms";
import {CreatureService} from "../../creature.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";
import {CreateMeasure} from "../../../../../../shared/interfaces/creature/create/create-measure";
import {Measure} from "../../../../../../shared/interfaces/creature/get/measure";
import {Attribute} from "../../../../../../shared/interfaces/creature/get/attribute";


@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent extends DestroySubscription implements OnInit {
  @Input() placeholder: string = '';
  @Input() route: Attributes | string = ''
  @Input() label: string = ''
  @Input() amt: boolean = false
  @Input() msr: boolean = true
  @Input() alwaysUseMsr: boolean = false
  @Input() defaultValues: Measure[] = []

  @Output() addMeasure = new EventEmitter<CreateMeasure>
  @Output() removeMeasure = new EventEmitter<CreateMeasure>

  selectedItems: Measure[] = []

  measureForm!: UntypedFormGroup;
  currentSelectedAttribute: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly creatureService: CreatureService,
    private readonly matSnack: MatSnackBar,
    private router: Router
  ) {
    super()
  }

  ngOnInit() {
    this.measureForm = this.formBuilder.group({
      amount: [null],
      measure: [null]
    })

    this.selectedItems = this.defaultValues
  }

  emitMeasure() {
    const isAttributeInUse = this.selectedItems.find(item => item.attribute === this.currentSelectedAttribute)

    if(!isAttributeInUse) {
      let element: Measure = {
        amt:  this.measureForm.get('amount')?.value,
        isMeasureEnable:  this.measureForm.get('measure')?.value,
        attribute: this.currentSelectedAttribute
      }

      this.selectedItems.push(element)

      this.addMeasure.emit(this.convertMeasureInCreationType(element))
    }
  }

  convertMeasureInCreationType(element: Measure): CreateMeasure {
    return {
      amt: element.amt,
      attribute: element.attribute?.id || 0,
      isMeasureEnable: element.isMeasureEnable
    }
  }

  setCurrentSelected($event: Attribute) {
    this.currentSelectedAttribute = $event
  }

  removeItemFromList($event: Measure) {
    const idx = this.selectedItems.findIndex(item => item === $event)

    if(idx !== -1) {
      this.selectedItems.splice(idx, 1)
      this.removeMeasure.emit(this.convertMeasureInCreationType($event))
    }
  }
}
