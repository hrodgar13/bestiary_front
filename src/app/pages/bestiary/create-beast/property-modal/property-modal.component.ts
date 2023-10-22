import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AttributeService} from "../attribute.service";
import {takeUntil} from "rxjs";
import {CreateAttribute} from "../../../../../shared/interfaces/creature/create-attribute.interface";

export interface MatData {
  route: string,
  title: string
}

@Component({
  selector: 'app-property-modal',
  templateUrl: './property-modal.component.html',
  styleUrls: ['./property-modal.component.scss']
})
export class PropertyModalComponent extends DestroySubscription implements OnInit{
  modalForm!: FormGroup;
  title: string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MatData,
    private formBuilder: FormBuilder,
    private modalService: AttributeService
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
    if(this.modalForm.invalid) {
      return
    }

    const payload: CreateAttribute = {
      en: this.modalForm.get('en')?.value,
      ua: this.modalForm.get('ua')?.value,
    }

    this.modalService.createAttribute(this.data.route, payload).pipe(takeUntil(this.destroyStream$)).subscribe((data) => {

    })
  }
}
