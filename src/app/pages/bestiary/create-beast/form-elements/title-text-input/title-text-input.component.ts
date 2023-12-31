import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, UntypedFormGroup} from "@angular/forms";
import {CreateActionAbility} from "../../../../../../shared/interfaces/creature/create/create-action-ability";
import {ActionAbilities} from "../../../../../../shared/static/creature/action-abilities.code";
import {ActionsAbilities} from "../../../../../../shared/interfaces/creature/get/actions-abilities";


@Component({
  selector: 'app-title-text-input',
  templateUrl: './title-text-input.component.html',
  styleUrls: ['./title-text-input.component.scss']
})
export class TitleTextInputComponent implements OnInit{
  @Input() blockName: string = 'Actions';
  @Input() defaultValues: ActionsAbilities[] = []
  @Input() actionCode: ActionAbilities | string = ''

  @Output() addValue = new EventEmitter<CreateActionAbility>()
  @Output() removeValue = new EventEmitter<CreateActionAbility>()

  titleTextList: ActionsAbilities[] = []

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

    const titleTextPayload: CreateActionAbility = {
      action_type: this.actionCode,
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
    this.addValue.emit(titleTextPayload)
  }

  removeElement($event: CreateActionAbility) {
    this.titleTextList.splice(this.titleTextList.findIndex(item => item === $event), 1)
    this.removeValue.emit($event)
  }
}
