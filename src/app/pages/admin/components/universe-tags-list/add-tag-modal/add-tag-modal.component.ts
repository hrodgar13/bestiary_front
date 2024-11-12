import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../../../../shared/services/api.service";
import {takeUntil} from "rxjs";
import {UniverseTagInterface} from "../../../../../../shared/interfaces/user/universe-tag.interface";
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";
import {Translation} from "@ngneat/transloco";

@Component({
  selector: 'app-add-tag-modal',
  templateUrl: './add-tag-modal.component.html',
  styleUrls: ['./add-tag-modal.component.scss']
})
export class AddTagModalComponent extends DestroySubscription implements OnInit{
  modalForm!: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<AddTagModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: UniverseTagInterface,
      private formBuilder: FormBuilder,
      private apiService: ApiService,
  ) {
    super();
  }

  ngOnInit() {
    const en = this.data?.tagName?.en || null
    const ua = this.data?.tagName?.ua || null

    this.modalForm = this.formBuilder.group({
      en: [en, Validators.required],
      ua: [ua, Validators.required]
    })
  }

  submitData() {
    if (this.modalForm.invalid) {
      return
    }

    const payload: Translation = {
        en: this.modalForm.get('en')?.value,
        ua: this.modalForm.get('ua')?.value
    }

    if(!this.data?.id) {
      this.apiService.createUniverseTag(payload).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        this.dialogRef.close(data)
      })
    } else {
      this.apiService.editUniverseTag(payload, this.data.id).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        this.dialogRef.close(data)
      })
    }
  }
}
