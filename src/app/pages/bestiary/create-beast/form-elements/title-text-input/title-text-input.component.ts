import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {CreateActionAbility} from "../../../../../../shared/interfaces/creature/create/create-action-ability";
import {ActionAbilities} from "../../../../../../shared/static/creature/action-abilities.code";
import {ActionsAbilities} from "../../../../../../shared/interfaces/creature/get/actions-abilities";
import {EditActionAbility} from "../../../../../../shared/interfaces/creature/create/edit-action-ability";
import {MatSnackBar} from "@angular/material/snack-bar";


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
  @Output() editValue = new EventEmitter<EditActionAbility>()

  titleTextList: ActionsAbilities[] = []

  form!: UntypedFormGroup

  constructor(
    private formBuilder: FormBuilder,
    private matSnack: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      titleEN: ['', Validators.required],
      titleUA: [],
      descriptionEN: ['', Validators.required],
      descriptionUA: [],
    })

    if(this.defaultValues.length) {
      this.titleTextList = this.defaultValues
    }
  }

  onListChange() {
    if(this.form.invalid) {
      // TODO Подумати над покращенням цього
      this.matSnack.open('Title EN and Description EN - required', 'ok', {
        duration: 4000,
        verticalPosition: "top"
      })
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

  editItem($event: EditActionAbility) {
    const idx = this.titleTextList.findIndex(item => item === $event.old)

    if(idx !== -1) {
      this.titleTextList[idx] = $event.new
    }

    this.editValue.emit($event)
  }

  getControl(controlName: string) {
    return this.form.get(controlName);
  }
}
