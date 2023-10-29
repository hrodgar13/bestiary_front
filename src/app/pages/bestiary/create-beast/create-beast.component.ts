import {Component, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormGroup} from "@angular/forms"
import {OutputMultiSelectData} from "./form-elements/multi-select/multi-select.component";
import {CreateTranslationAttribute} from "../../../../shared/interfaces/creature/create-attribute.interface";
import {ActionsAndAbilities} from "./form-elements/title-text-input/title-text-input.component";

export interface CreaturePayload {
  isFinished: boolean,
  creatureName?: CreateTranslationAttribute,
  alignment?: number,
  type?: number,
  size?: number,
  armorClass?: number
  armorTag?: number
  hits?: number,
  hitsInDice?: string,
  strength?: number,
  dexterity?: number,
  construction?: number,
  intelligence?: number,
  wisdom?: number,
  charisma?: number,
  multiSelects: MultiSelectAmount
  dangerLevel?: number,
  experience?: string,
  masteryBonus?: number
  actionsAbilities: ActionsAndAbilitiesAmount
  description?: CreateTranslationAttribute
}

export interface MultiSelectAmount {
  [MultiFieldsENUM.immunities]?: OutputMultiSelectData[]
  [MultiFieldsENUM.vulnerabilities]?: OutputMultiSelectData[]
  [MultiFieldsENUM.speeds]?: OutputMultiSelectData[]
  [MultiFieldsENUM.resists]?: OutputMultiSelectData[]
  [MultiFieldsENUM.feelings]?: OutputMultiSelectData[]
  [MultiFieldsENUM.savingThrows]?: OutputMultiSelectData[]
  [MultiFieldsENUM.skills]?: OutputMultiSelectData[]
  [MultiFieldsENUM.conditionsImmunities]?: OutputMultiSelectData[]
  [MultiFieldsENUM.languages]?: OutputMultiSelectData[]
  [MultiFieldsENUM.regions]?: OutputMultiSelectData[]
}

export interface ActionsAndAbilitiesAmount {
  [ActionsAbilitiesENUM.abilities]?: ActionsAndAbilities[],
  [ActionsAbilitiesENUM.actions]?: ActionsAndAbilities[]
  [ActionsAbilitiesENUM.bonusActions]?: ActionsAndAbilities[]
  [ActionsAbilitiesENUM.legendaryActions]?: ActionsAndAbilities[]
}

// export interface ActionsAndAbilities {
//   title?: CreateTranslationAttribute
//   description?: CreateTranslationAttribute
// }

export enum ActionsAbilitiesENUM{
  abilities = 'abilities',
  actions = 'actions',
  bonusActions = 'bonus-actions',
  legendaryActions = 'legendary-actions'
}

export enum MultiFieldsENUM {
  vulnerabilities = 'vulnerabilities',
  immunities = 'immunities',
  speeds = 'speeds',
  resists = 'resists',
  feelings = 'feelings',
  savingThrows = 'saving-throws',
  skills = 'skills',
  conditionsImmunities = 'conditions-immunities',
  languages = 'languages',
  regions = 'regions'
}

@Component({
  selector: 'app-create-beast',
  templateUrl: './create-beast.component.html',
  styleUrls: ['./create-beast.component.scss']
})
export class CreateBeastComponent implements OnInit {
  FieldsEnum = MultiFieldsENUM

  creaturePayload: CreaturePayload = {
    isFinished: false,
    multiSelects: {},
    actionsAbilities: {}
  }

  creatureForm!: UntypedFormGroup;
  constructor(
    private readonly formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.creatureForm = this.formBuilder.group({
      creatureNameUa: [null],
      creatureNameEn: [null],
      alignment: [null],
      type: [null],
      size: [null],
      armorClass: [null],
      armorTag: [null],
      hits: [null],
      hitsInDice: [null],
      strength: [null],
      dexterity: [null],
      construction: [null],
      intelligence: [null],
      wisdom: [null],
      charisma: [null],
      dangerLevel: [null],
      experience: [null],
      masteryBonus: [null],
      descriptionEN: [null],
      descriptionUA: [null]
    })
  }

  writeForm() {
    if(this.creatureForm.invalid) {
      return
    }

    this.creaturePayload = {
      isFinished: false,
      creatureName: {
        ua: this.creatureForm.value.creatureNameEn,
        en: this.creatureForm.value.creatureNameUa
      },
      alignment: this.creatureForm.value.alignment,
      type: this.creatureForm.value.type,
      size: this.creatureForm.value.size,
      armorClass: this.creatureForm.value.armorClass,
      armorTag: this.creatureForm.value.armorTag,
      hits: this.creatureForm.value.hits,
      hitsInDice: this.creatureForm.value.hitsInDice,
      strength: this.creatureForm.value.strength,
      dexterity: this.creatureForm.value.dexterity,
      construction: this.creatureForm.value.construction,
      intelligence: this.creatureForm.value.intelligence,
      wisdom: this.creatureForm.value.wisdom,
      charisma: this.creatureForm.value.charisma,
      dangerLevel: this.creatureForm.value.dangerLevel,
      experience: this.creatureForm.value.experience,
      masteryBonus: this.creatureForm.value.masteryBonus,
      multiSelects: this.creaturePayload.multiSelects,
      actionsAbilities: this.creaturePayload.actionsAbilities,
      description: {
        ua: this.creatureForm.value.descriptionUA,
        en: this.creatureForm.value.descriptionEN
      }
    }

    console.log(this.creaturePayload)
  }

  writeValueToCreature(route: MultiFieldsENUM, $event: OutputMultiSelectData[]) {
    this.creaturePayload.multiSelects[route] = $event
  }

  protected readonly ActionsAbilitiesENUM = ActionsAbilitiesENUM;

  setAbilityOrAction(abilities: ActionsAbilitiesENUM, $event: ActionsAndAbilities[]) {
    this.creaturePayload.actionsAbilities[abilities] = $event
  }
}
