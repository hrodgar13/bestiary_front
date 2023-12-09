import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormGroup} from "@angular/forms"
import {CreateTranslationAttribute} from "../../../../shared/interfaces/creature/create-attribute.interface";
import {ActionsAndAbilities} from "./form-elements/title-text-input/title-text-input.component";
import {CreateAttributeMeasure} from "../../../../shared/interfaces/creature/create-attribute-measure.interface";
import {CreatureService} from "./creature.service";
import {concatMap, of, switchMap, takeUntil} from "rxjs";
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Creature, Measure} from "../beast-page/beast-page.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MultiSelectList} from "./form-elements/multi-select/multi-select.component";

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
  [MultiFieldsENUM.immunities]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.vulnerabilities]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.speeds]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.resists]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.feelings]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.savingThrows]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.skills]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.conditionsImmunities]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.languages]?: CreateAttributeMeasure[]
  [MultiFieldsENUM.regions]?: CreateAttributeMeasure[]
}

export interface ActionsAndAbilitiesAmount {
  [ActionsAbilitiesENUM.abilities]?: ActionsAndAbilities[],
  [ActionsAbilitiesENUM.actions]?: ActionsAndAbilities[]
  [ActionsAbilitiesENUM.bonusActions]?: ActionsAndAbilities[]
  [ActionsAbilitiesENUM.legendaryActions]?: ActionsAndAbilities[]
}

export enum ActionsAbilitiesENUM{
  abilities = 'abilities',
  actions = 'actions',
  bonusActions = 'bonusActions',
  legendaryActions = 'legendaryActions'
}

export enum MultiFieldsENUM {
  vulnerabilities = 'vulnerabilities',
  immunities = 'immunities',
  speeds = 'speeds',
  resists = 'resists',
  feelings = 'feelings',
  savingThrows = 'savingThrows',
  skills = 'skills',
  conditionsImmunities = 'conditionsImmunities',
  languages = 'languages',
  regions = 'regions'
}

@Component({
  selector: 'app-create-beast',
  templateUrl: './create-beast.component.html',
  styleUrls: ['./create-beast.component.scss']
})
export class CreateBeastComponent extends DestroySubscription implements OnInit, OnDestroy {
  FieldsEnum = MultiFieldsENUM
  creatureId: null | number = null
  creatureToUpdate: Creature | null = null

  creaturePayload: CreaturePayload = {
    isFinished: false,
    multiSelects: {},
    actionsAbilities: {}
  }

  creatureForm!: UntypedFormGroup;
  private isFinished = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly creatureService: CreatureService,
    private readonly matSnack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super()
  }

  ngOnInit(): void {
    let editableCreature = localStorage.getItem('creature-id')

    this.route.params.pipe(takeUntil(this.destroyStream$)).subscribe(params => {
      if(editableCreature && !params['id']) {
        localStorage.removeItem('creature-id')
        this.router.navigate(['bestiary/edit/' + editableCreature])
      } else {
        editableCreature = params['id']
      }
    })

    if(editableCreature) {
      this.creatureId = +editableCreature
    }

    if (this.creatureId) {
      this.creatureService.getCreatureById(this.creatureId).pipe(
        takeUntil(this.destroyStream$),
        concatMap(data => {
          this.creatureToUpdate = data;
          return of(data);
        })
      ).subscribe(() => {
        this.initForm();
      });
    } else {
      this.initForm();
    }


    setInterval(() => {
      if(!this.isFinished) {
        this.writeForm(false)
      }
    },  5 * 60 * 1000)

  }

  private initForm() {
    this.creatureForm = this.formBuilder.group({
      creatureNameUa: [this.creatureToUpdate?.creatureName.ua || null],
      creatureNameEn: [this.creatureToUpdate?.creatureName.en || null],
      alignment: [this.creatureToUpdate?.alignment?.id || null],
      type: [this.creatureToUpdate?.type?.id || null],
      size: [this.creatureToUpdate?.size?.id || null],
      armorClass: [this.creatureToUpdate?.armorClass || null],
      armorTag: [this.creatureToUpdate?.armorTag?.id || null],
      hits: [this.creatureToUpdate?.hits || null],
      hitsInDice: [this.creatureToUpdate?.hitsInDice || null],
      strength: [this.creatureToUpdate?.strength || null],
      dexterity: [this.creatureToUpdate?.dexterity || null],
      construction: [this.creatureToUpdate?.construction || null],
      intelligence: [this.creatureToUpdate?.intelligence || null],
      wisdom: [this.creatureToUpdate?.wisdom || null],
      charisma: [this.creatureToUpdate?.charisma || null],
      dangerLevel: [this.creatureToUpdate?.dangerLevel || null],
      experience: [this.creatureToUpdate?.experience || null],
      masteryBonus: [this.creatureToUpdate?.masteryBonus || null],
      descriptionEN: [this.creatureToUpdate?.description?.en || null],
      descriptionUA: [this.creatureToUpdate?.description?.ua || null]
    })
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    localStorage.removeItem('creature-id')
  }

  writeForm(isFinished: boolean) {
    this.isFinished = isFinished
    if(this.creatureForm.invalid) {
      return
    }

    this.creaturePayload = {
      isFinished: this.isFinished,
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

    if(this.creatureId) {
      this.creatureService.patchCreature(this.creatureId, this.creaturePayload).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        this.matSnack.open('Saved','', {
          duration: 1500,
          verticalPosition: "top"
        })
      })
    } else {
      this.creatureService.createCreature(this.creaturePayload).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        this.matSnack.open('Saved','', {
          duration: 1500,
          verticalPosition: "top"
        })
        this.creatureId = data.id
        localStorage.setItem('creature-id', data.id)
      })
    }

  }

  writeValueToCreature(route: MultiFieldsENUM, $event: CreateAttributeMeasure[]) {
    this.creaturePayload.multiSelects[route] = $event
  }

  protected readonly ActionsAbilitiesENUM = ActionsAbilitiesENUM;

  setAbilityOrAction(abilities: ActionsAbilitiesENUM, $event: ActionsAndAbilities[]) {
    this.creaturePayload.actionsAbilities[abilities] = $event
  }

  convertMeasureToMultiSelect(param: Measure[] | null): MultiSelectList[] {
    if(!param) {
      return []
    }

    const attrs = param.map(item => {
      return {
        id: item.id,
        title: {en: item?.attribute?.attrName?.en, ua: item?.attribute?.attrName?.ua},
        msr: item.isMeasureEnable ? item.isMeasureEnable : false,
        amt: item.amt ? item.amt : 0
      }
    })

    return attrs
  }
}
