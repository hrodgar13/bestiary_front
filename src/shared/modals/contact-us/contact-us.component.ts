import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../helpers/destroy-subscribtion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {takeUntil} from "rxjs";
import {CreateRequest} from "../../interfaces/request/create-request.interface";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface SelectMessageTypeI {
    text: string
    id: string
}

export const MessageTypes: SelectMessageTypeI[] = [
    {
        id: 'ADMIN_REQUEST',
        text: 'Administration join'
    },
    {
        id: 'OTHER',
        text: 'Other'
    }
]

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent extends DestroySubscription implements OnInit {
    modalForm!: FormGroup;
    title: string = 'ADD'
    selectData: SelectMessageTypeI[] = MessageTypes;

    constructor(
        public dialogRef: MatDialogRef<ContactUsComponent>,
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private matSnackBar: MatSnackBar
    ) {
        super();
    }

    ngOnInit() {
        this.modalForm = this.formBuilder.group({
            formType: [null, Validators.required],
            text: [null,Validators.required]
        })
    }

    submitData() {
        if (this.modalForm.invalid) {
            return
        }

        const payload: CreateRequest = {
            isAdminRequest: this.modalForm.get('formType')?.value === 'ADMIN_REQUEST',
            text: this.modalForm.get('text')?.value
        }

        this.apiService.sendMessage(payload).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
          this.matSnackBar.open(data.message, 'ok', {
            verticalPosition: "top",
            duration: 3000
          })
          this.dialogRef.close(data)
        })
    }
}
