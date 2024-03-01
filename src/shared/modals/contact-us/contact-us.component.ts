import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../helpers/destroy-subscribtion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {takeUntil} from "rxjs";
import {CreateRequest} from "../../interfaces/request/create-request.interface";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent extends DestroySubscription implements OnInit {
  modalForm!: FormGroup;
  title: string = 'ADD'

  constructor(
    public dialogRef: MatDialogRef<ContactUsComponent>,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {
    super();
  }

  ngOnInit() {
    this.modalForm = this.formBuilder.group({
      isAdminRequest: [Validators.required],
      text: [Validators.required]
    })
  }

  submitData() {
    if (this.modalForm.invalid) {
      return
    }

    const payload: CreateRequest = {
      isAdminRequest: this.modalForm.get('isAdminRequest')?.value === 'ADMIN_REQUEST',
      text: this.modalForm.get('text')?.value
    }

    this.apiService.sendMessage(payload).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.dialogRef.close(data)
    })
  }
}
