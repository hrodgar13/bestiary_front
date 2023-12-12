import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, UntypedFormGroup} from "@angular/forms";
import {CreateTranslationAttribute} from "../../../../../../shared/interfaces/creature/create-attribute.interface";

export interface ActionsAndAbilities {
  title?: CreateTranslationAttribute
  description?: CreateTranslationAttribute
}

@Component({
  selector: 'app-title-text-input',
  templateUrl: './title-text-input.component.html',
  styleUrls: ['./title-text-input.component.scss']
})
export class TitleTextInputComponent implements OnInit{
  @Input() blockName: string = 'Actions';
  @Input() defaultValues: ActionsAndAbilities[] = []

  @Output() listChange = new EventEmitter<ActionsAndAbilities[]>()



  titleTextList: ActionsAndAbilities[] = []

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

    if(this.defaultValues.length) {
      this.titleTextList = this.defaultValues
    }
  }

  onListChange() {
    if(this.form.invalid) {
      return
    }

    const titleTextPayload: ActionsAndAbilities = {
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

  removeElement($event: ActionsAndAbilities) {
    this.titleTextList.splice(this.titleTextList.findIndex(item => item === $event), 1)
    this.listChange.emit(this.titleTextList)
  }
}
