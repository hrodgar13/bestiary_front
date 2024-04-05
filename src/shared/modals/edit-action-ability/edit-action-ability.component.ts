import {Component, Inject, OnInit} from '@angular/core';
import {DestroySubscription} from "../../helpers/destroy-subscribtion";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateActionAbility} from "../../interfaces/creature/create/create-action-ability";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-action-ability',
  templateUrl: './edit-action-ability.component.html',
  styleUrls: ['./edit-action-ability.component.scss']
})
export class EditActionAbilityComponent extends DestroySubscription implements OnInit {

  editForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateActionAbility,
    private dialogRef: MatDialogRef<EditActionAbilityComponent>,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      titleUA: [this.data.title.ua || ''],
      titleEN: [this.data.title.en || '', Validators.required],
      descUA: [this.data.description.ua || ''],
      descEN: [this.data.description.en || '', Validators.required],
    })
  }

  submitData() {
    let payload: CreateActionAbility = {
      id: this.data.id,
      action_type: this.data.action_type,
      title: {
        en: this.editForm.get('titleEN')?.value,
        ua: this.editForm.get('titleUA')?.value
      },
      description: {
        en: this.editForm.get('descEN')?.value,
        ua: this.editForm.get('descUA')?.value
      },
    }

    this.dialogRef.close(payload)
  }
}
