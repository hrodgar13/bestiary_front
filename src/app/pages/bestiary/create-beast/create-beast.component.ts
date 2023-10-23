import {Component, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormGroup} from "@angular/forms"

@Component({
  selector: 'app-create-beast',
  templateUrl: './create-beast.component.html',
  styleUrls: ['./create-beast.component.scss']
})
export class CreateBeastComponent implements OnInit {
  creatureForm!: UntypedFormGroup;
  constructor(
    private readonly formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.creatureForm = this.formBuilder.group({

    })
  }

  writeForm() {
  }
}
