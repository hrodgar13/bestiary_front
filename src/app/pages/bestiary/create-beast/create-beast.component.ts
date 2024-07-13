import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormGroup} from "@angular/forms"
import {CreatureService} from "./creature.service";
import {interval, takeUntil} from "rxjs";
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {Creature} from "../../../../shared/interfaces/creature/get/creature";
import {AttributeCode} from "../../../../shared/static/creature/attributes.code";
import {Attribute} from "../../../../shared/interfaces/creature/get/attribute";
import {CreateMeasure} from "../../../../shared/interfaces/creature/create/create-measure";
import {CreateCreature} from "../../../../shared/interfaces/creature/create/create-creature";
import {CreateActionAbility} from "../../../../shared/interfaces/creature/create/create-action-ability";
import {Measure} from "../../../../shared/interfaces/creature/get/measure";
import {ActionsAbilities} from "../../../../shared/interfaces/creature/get/actions-abilities";
import {MeasureCode} from "../../../../shared/static/creature/measure.code";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ActionAbilities} from "../../../../shared/static/creature/action-abilities.code";
import {EditActionAbility} from "../../../../shared/interfaces/creature/create/edit-action-ability";
import {CharacteristicCode} from "../../../../shared/static/creature/characteristic.code";

export interface ScalingCharacteristics {
  [CharacteristicCode.strength]: number
  [CharacteristicCode.dexterity]: number
  [CharacteristicCode.constitution]: number
  [CharacteristicCode.intelligence]: number
  [CharacteristicCode.wisdom]: number
  [CharacteristicCode.charisma]: number
  mastery_bonus: number
}

@Component({
  selector: 'app-create-beast',
  templateUrl: './create-beast.component.html',
  styleUrls: ['./create-beast.component.scss']
})
export class CreateBeastComponent extends DestroySubscription implements OnInit, OnDestroy {
  CHARACTERISTIC_CODE = CharacteristicCode

  scaling_from: ScalingCharacteristics = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    mastery_bonus: 0
  }

  interval = interval(5 * 60 * 1000)

  AttributesCodes = AttributeCode
  MeasuresCodes = MeasureCode
  ActionCodes = ActionAbilities

  creatureId: null | number = null
  creaturePayload!: Creature

  measures: CreateMeasure[] = []
  actionAbilities: CreateActionAbility[] = []

  creatureForm!: UntypedFormGroup;
  creatureImage: string | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly creatureService: CreatureService,
    private readonly matSnack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    super()
  }

  ngOnInit(): void {
    this.detectCreatureToUpdateId()
    this.route.params.pipe(takeUntil(this.destroyStream$)).subscribe(param => {
      this.creatureId = param['id']
      this.getCreatureToUpdate()
    })

    this.startAutoSave()
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    localStorage.removeItem('creatureId')
  }

  private getCreatureToUpdate() {
    if (this.creatureId) {
      this.creatureService.getCreatureById(this.creatureId).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        this.creaturePayload = data

        this.measures = this.convertMeasureInCreationType(data.measures)
        this.actionAbilities = this.convertActionAbilitiesInCreationType(data.action_abilities)
        this.creatureImage = data.image

        this.initForm()
      })
    } else {
      this.initForm()
    }
  }

  private initForm() {
    this.creatureForm = this.formBuilder.group({
      name_en: [this.creaturePayload?.name.en, []],
      name_ua: [this.creaturePayload?.name.ua || null],
      armor_class: [this.creaturePayload?.armor_class || null],
      hits: [this.creaturePayload?.hits || null],
      hits_in_dice: [this.creaturePayload?.hits_in_dice || null],
      danger_lvl: [this.creaturePayload?.danger_lvl || null],
      experience: [this.creaturePayload?.experience || null],
      mastery_bonus: [this.creaturePayload?.mastery_bonus || null],
      strength: [this.creaturePayload?.stat_block.strength || null],
      dexterity: [this.creaturePayload?.stat_block.dexterity || null],
      constitution: [this.creaturePayload?.stat_block.constitution || null],
      intelligence: [this.creaturePayload?.stat_block.intelligence || null],
      wisdom: [this.creaturePayload?.stat_block.wisdom || null],
      charisma: [this.creaturePayload?.stat_block.charisma || null],
      description_en: [this.creaturePayload?.description.en || null],
      description_ua: [this.creaturePayload?.description.ua || null],
      alignment: [this.defineSingleAttribute(this.creaturePayload, AttributeCode.alignment)],
      size: [this.defineSingleAttribute(this.creaturePayload, AttributeCode.size)],
      type: [this.defineSingleAttribute(this.creaturePayload, AttributeCode.type)],
    })

    this.scaling_from = {
      strength: this.creaturePayload?.stat_block.strength || 0,
      dexterity: this.creaturePayload?.stat_block.dexterity || 0,
      constitution: this.creaturePayload?.stat_block.constitution || 0,
      intelligence: this.creaturePayload?.stat_block.intelligence || 0,
      wisdom: this.creaturePayload?.stat_block.wisdom || 0,
      charisma: this.creaturePayload?.stat_block.charisma || 0,
      mastery_bonus: this.creaturePayload?.mastery_bonus || 0,
    }
  }

  sendForm(finishedStatus?: boolean) {
    if (this.creatureForm.invalid) {
      return
    }


    if (finishedStatus === undefined) {
      let finished = false

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {message: 'Do you finish The Beast?'}})

      dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        finished = data

        const creaturePayload: CreateCreature = this.prepareCreaturePayload(finished)
        this.createUpdateCreature(creaturePayload)

      })

    } else {
      const creaturePayload: CreateCreature = this.prepareCreaturePayload(finishedStatus)
      this.createUpdateCreature(creaturePayload)
    }
  }

  private prepareCreaturePayload(finished: boolean): CreateCreature {
    return {
      name: {
        id: this.creaturePayload?.name.id || undefined,
        en: this.creatureForm.get('name_en')?.value,
        ua: this.creatureForm.get('name_ua')?.value,
      },
      image: this.creatureImage,
      isFinished: finished,
      armor_class: this.creatureForm.get('armor_class')?.value,
      hits: this.creatureForm.get('hits')?.value,
      hits_in_dice: this.creatureForm.get('hits_in_dice')?.value,
      danger_lvl: this.creatureForm.get('danger_lvl')?.value,
      experience: this.creatureForm.get('experience')?.value,
      mastery_bonus: this.creatureForm.get('mastery_bonus')?.value,
      stat_block: {
        id: this.creaturePayload?.stat_block?.id || undefined,
        strength: this.creatureForm.get('strength')?.value,
        dexterity: this.creatureForm.get('dexterity')?.value,
        constitution: this.creatureForm.get('constitution')?.value,
        intelligence: this.creatureForm.get('intelligence')?.value,
        wisdom: this.creatureForm.get('wisdom')?.value,
        charisma: this.creatureForm.get('charisma')?.value
      },
      measures: this.measures,
      attributes: [this.creatureForm.get('alignment')?.value, this.creatureForm.get('size')?.value, this.creatureForm.get('type')?.value],
      action_abilities: this.actionAbilities,
      description: {
        en: this.creatureForm.get('description_en')?.value,
        ua: this.creatureForm.get('description_ua')?.value,
      }
    }
  }

  private createUpdateCreature(creaturePayload: CreateCreature) {
    if (!this.creatureId) {
      this.creatureService.createCreature(creaturePayload).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        this.creatureId = data.id

        localStorage.setItem('creatureId', data.id)

        this.matSnack.open('saved', 'ok', {
          duration: 3000,
          verticalPosition: "top"
        })
      })
    } else {
      this.creatureService.patchCreature(this.creatureId, creaturePayload).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        this.matSnack.open('saved', 'ok', {
          duration: 3000,
          verticalPosition: "top"
        })
      })
    }

  }

  private defineSingleAttribute(creaturePayload: Creature, attr_cat: string): number | null {
    return this.creaturePayload?.attributes.find(item => item.attr_cat === attr_cat)?.id || null
  }

  private convertAttributeInCreationType(attributes: Attribute[]): number[] {
    return attributes.map(attr => attr.id);
  }

  private convertMeasureInCreationType(measures: Measure[]): CreateMeasure[] {
    return measures.map(measure => {
      const attribute: Attribute[] = measure.attribute ? [measure.attribute] : []

      return {
        ...measure,
        attribute: this.convertAttributeInCreationType(attribute)[0]
      }
    })
  }

  private convertActionAbilitiesInCreationType(action_abilities: ActionsAbilities[]): CreateActionAbility[] {
    const create_action_abilities: CreateActionAbility[] = []

    action_abilities.forEach(item => {
      create_action_abilities.push({
        id: item.id,
        action_type: item.action_type,
        description: item.description,
        title: item.title
      })
    });

    return create_action_abilities
  }

  addMeasure($event: CreateMeasure) {
    this.measures.push($event)
  }

  removeMeasure($event: CreateMeasure) {
    const idx = this.measures.findIndex(item => item.attribute === $event.attribute && item.measure_cat === item.measure_cat)

    if (idx !== -1) {
      this.measures.splice(idx, 1)
    }
  }

  addActionAbility($event: CreateActionAbility) {
    this.actionAbilities.push($event)
  }

  removeActionAbility($event: CreateActionAbility) {
    const idx = this.actionAbilities.findIndex(item => item.id === $event.id)

    if (idx !== -1) {
      this.actionAbilities.splice(idx, 1)
    }

    if(!!$event && !!$event.id) {
      this.creatureService.deleteActionAbility($event.id).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        this.matSnack.open(data.message, 'ok', {
          verticalPosition: "top",
          duration: 3000
        })
      }, err => {
        this.matSnack.open(err.error.message, 'ok', {
          verticalPosition: "top",
          duration: 3000
        })
      })
    }
  }

  editActionAbility($event: EditActionAbility) {
    const idx = this.actionAbilities.findIndex(item => item.title.en === $event.old.title.en && item.description.en === $event.old.description.en)

    if (idx !== -1) {
      this.actionAbilities[idx] = $event.new
    }
  }

  private detectCreatureToUpdateId() {
    const creatureId = localStorage.getItem('creatureId')

    if (creatureId) {
      localStorage.removeItem('creatureId')
      this.router.navigate([`../bestiary/edit/${creatureId}`])
    }
  }

  private startAutoSave() {
    this.interval.pipe(takeUntil(this.destroyStream$)).subscribe(() => {
      this.sendForm(false)
    })
  }

  protected readonly ActionAbilities = ActionAbilities;

  filterActionAbilities(abilities: ActionAbilities): ActionsAbilities[] {
    if (this.creaturePayload) {
      return this.creaturePayload.action_abilities.filter(item => item.action_type === abilities);
    }

    return []
  }

  filterMeasuresByCategories(measure_code: MeasureCode): Measure[] {
    if (this.creaturePayload) {
      return this.creaturePayload.measures.filter(item => item.measure_cat === measure_code);
    }

    return []
  }

  setPhoto(event: string) {
    this.creatureImage = event
    this.sendForm()
  }

  setScaleFromCharacteristic(characteristic: CharacteristicCode, $event: number) {
    this.scaling_from[characteristic] = $event
  }

  setMasteryScaling($event: number) {
    this.scaling_from.mastery_bonus = $event
  }
}
