import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateAttribute} from "../../../../../shared/interfaces/creature/create/create-attribute";
import {CreatureService} from "../creature.service";
import {AttributeCode} from "../../../../../shared/static/creature/attributes.code";

export interface MatData {
  attr_cat: AttributeCode | string,
  title: string
}

@Component({
  selector: 'app-property-modal',
  templateUrl: './property-modal.component.html',
  styleUrls: ['./property-modal.component.scss']
})
export class PropertyModalComponent extends DestroySubscription implements OnInit {
  modalForm!: FormGroup;
  title: string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MatData,
    private formBuilder: FormBuilder,
    private creatureService: CreatureService,
    private matSnack: MatSnackBar,
    public dialogRef: MatDialogRef<PropertyModalComponent>
  ) {
    super();
  }

  ngOnInit() {
    this.title = this.data.title

    this.modalForm = this.formBuilder.group({
      en: [null, Validators.required],
      ua: [null, Validators.required]
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
      }
    }

    this.creatureService.createAttribute(payload).pipe(takeUntil(this.destroyStream$)).subscribe(data => {

    })
  }
}
