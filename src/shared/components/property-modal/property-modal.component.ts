import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {AttributeCode} from "../../static/creature/attributes.code";
import {DestroySubscription} from "../../helpers/destroy-subscribtion";
import {CreateAttribute} from "../../interfaces/creature/create/create-attribute";
import {Translation} from "../../interfaces/creature/get/translation";
import {ApiService} from "../../services/api.service";
import {CharacteristicCode} from "../../static/creature/characteristic.code";

export interface MatData {
  attr_cat: AttributeCode | string,
  title: string,
  initData?: Translation
  initScaling: CharacteristicCode | null,
  attributeId?: number
}

@Component({
  selector: 'app-property-modal',
  templateUrl: './property-modal.component.html',
  styleUrls: ['./property-modal.component.scss']
})
export class PropertyModalComponent extends DestroySubscription implements OnInit {
  modalForm!: FormGroup;
  title: string = 'ADD'

  characteristicList = CharacteristicCode

  isScalable: boolean = false
  _scalableCharacteristic: CharacteristicCode | null = null


  constructor(
    public dialogRef: MatDialogRef<PropertyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatData,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {
    super();
  }

  ngOnInit() {
    if(this.data.title) {
      this.title = this.data.title
    }

    this.modalForm = this.formBuilder.group({
      scalingCharacteristic: [this.data.initScaling || null],
      en: [this.data.initData?.en, Validators.required],
      ua: [this.data.initData?.ua, Validators.required]
    })
  }

  submitData() {
    if (this.modalForm.invalid) {
      return
    }

    const payload: CreateAttribute = {
      attr_cat: this.data.attr_cat,
      name: {
        en: this.modalForm.get('en')?.value,
        ua: this.modalForm.get('ua')?.value
      },
      scaling_from: this._scalableCharacteristic
    }

    if(!this.data.attributeId) {

      this.apiService.createAttribute(payload).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        this.dialogRef.close(data)
      })
    } else {
      this.apiService.editAttribute(payload, this.data.attributeId).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        this.dialogRef.close(data)
      })
    }
  }

  protected readonly Object = Object;
}
