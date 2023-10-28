import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, UntypedFormGroup} from "@angular/forms";
import {CreateTranslationAttribute} from "../../../../../../shared/interfaces/creature/create-attribute.interface";

export interface TitleTextPayload {
  title?: CreateTranslationAttribute
  description?: CreateTranslationAttribute
}

@Component({
  selector: 'app-title-text-input',
  templateUrl: './title-text-input.component.html',
  styleUrls: ['./title-text-input.component.scss']
})
export class TitleTextInputComponent implements OnInit{
  @Input()blockName: string = 'Actions';

  @Output() listChange = new EventEmitter<TitleTextPayload[]>()

  titleTextList: TitleTextPayload[] = []

  form!: UntypedFormGroup

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      titleEN: [],
      titleUA: [],
      descriptionEN: [],
      descriptionUA: [],
    })
  }

  onListChange() {
    if(this.form.invalid) {
      return
    }

    const titleTextPayload: TitleTextPayload = {
      description: {
        en: this.form.value.descriptionEN,
        ua: this.form.value.descriptionUA
      },
      title: {
        en: this.form.value.titleEN,
        ua: this.form.value.titleUA
      }
    }

    this.titleTextList.push(titleTextPayload)
    this.listChange.emit(this.titleTextList)
  }

  removeElement($event: TitleTextPayload) {
    this.titleTextList.splice(this.titleTextList.findIndex(item => item === $event), 1)
    this.listChange.emit(this.titleTextList)
  }
}