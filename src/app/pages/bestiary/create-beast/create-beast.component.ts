import {Component, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormGroup} from "@angular/forms"
import {CreatureService} from "./creature.service";
import {concatMap, of, switchMap, takeUntil} from "rxjs";
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {Creature} from "../../../../shared/interfaces/creature/get/creature";
import {Attributes} from "../../../../shared/static/creature/attributes.code";
import {Attribute} from "../../../../shared/interfaces/creature/get/attribute";
import {CreateMeasure} from "../../../../shared/interfaces/creature/create/create-measure";
import {CreateCreature} from "../../../../shared/interfaces/creature/create/create-creature";
import {CreateActionAbility} from "../../../../shared/interfaces/creature/create/create-action-ability";
import {CreateAttribute} from "../../../../shared/interfaces/creature/create/create-attribute";
import {Measure} from "../../../../shared/interfaces/creature/get/measure";
import {ActionsAbilities} from "../../../../shared/interfaces/creature/get/actions-abilities";
import {ActionAbilities} from "../../../../shared/static/creature/action-abilities.code";
import {CreateTranslation} from "../../../../shared/interfaces/creature/create/create-translation";
import {iterator} from "rxjs/internal/symbol/iterator";

@Component({
  selector: 'app-create-beast',
  templateUrl: './create-beast.component.html',
  styleUrls: ['./create-beast.component.scss']
})
export class CreateBeastComponent extends DestroySubscription implements OnInit {

  AttributesCodes = Attributes

  creatureId: null | number = null
  creaturePayload!: Creature

  attributes: number[] = []
  measures: CreateMeasure[] = []
  actionAbilities: CreateActionAbility[] = []

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
    this.initForm()
  }

  private getCreatureToUpdate() {
    if (this.creatureId) {
      this.creatureService.getCreatureById(this.creatureId).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        this.creaturePayload = data

        this.attributes = this.convertAttributeInCreationType(data.attributes)
        this.measures = this.convertMeasureInCreationType(data.measures)
        this.actionAbilities = this.convertActionAbilitiesInCreationType(data.action_abilities)
      })
    }

    this.initForm()
  }

  private initForm() {
    this.creatureForm = this.formBuilder.group({
      name_en: [this.creaturePayload?.name.en, []],
      name_ua: [this.creaturePayload?.name.en || null],
      armor_class: [this.creaturePayload?.armor_class || null],
      hits: [this.creaturePayload?.hits || null],
      hits_in_dice: [this.creaturePayload?.hits_in_dice || null],
      danger_lvl: [this.creaturePayload?.danger_lvl || null],
      experience: [this.creaturePayload?.experience || null],
      mastery_bonus: [this.creaturePayload?.mastery_bonus || null],
      strength: [this.creaturePayload?.stat_block.strength || null],
      dexterity: [this.creaturePayload?.stat_block.strength || null],
      constitution: [this.creaturePayload?.stat_block.strength || null],
      intelligence: [this.creaturePayload?.stat_block.strength || null],
      wisdom: [this.creaturePayload?.stat_block.strength || null],
      charisma: [this.creaturePayload?.stat_block.strength || null],
      description_en: [this.creaturePayload?.description.en || null],
      description_ua: [this.creaturePayload?.description.ua || null],
      alignment: [this.defineSingleAttribute(this.creaturePayload, Attributes.alignment)],
      size: [this.defineSingleAttribute(this.creaturePayload, Attributes.size)],
      type: [this.defineSingleAttribute(this.creaturePayload, Attributes.type)],
    })
  }

  private sendForm() {
    if (this.creatureForm.invalid) {
      return
    }

    const creaturePayload: CreateCreature = {
      name: {
        id: this.creaturePayload.id,
        en: this.creatureForm.get('name_en')?.value,
        ua: this.creatureForm.get('name_ua')?.value,
      },
      isFinished: this.isFinished,
      armor_class: this.creatureForm.get('armor_class')?.value,
      hits: this.creatureForm.get('hits')?.value,
      hits_in_dice: this.creatureForm.get('hits_in_dice')?.value,
      danger_lvl: this.creatureForm.get('danger_lvl')?.value,
      experience: this.creatureForm.get('experience')?.value,
      mastery_bonus: this.creatureForm.get('mastery_bonus')?.value,
      stat_block: {
        id: this.creaturePayload.stat_block.id,
        strength: this.creatureForm.get('strength')?.value,
        dexterity: this.creatureForm.get('dexterity')?.value,
        constitution: this.creatureForm.get('constitution')?.value,
        intelligence: this.creatureForm.get('intelligence')?.value,
        wisdom: this.creatureForm.get('wisdom')?.value,
        charisma: this.creatureForm.get('charisma')?.value
      },
      measures: this.measures,
      attributes: this.attributes,
      action_abilities: this.actionAbilities,
      description: {
        en: this.creatureForm.get('description_en')?.value,
        ua: this.creatureForm.get('description_ua')?.value,
      }
    }

    console.log(creaturePayload)

    // this.creatureService.createCreature(creaturePayload).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
    //     this.matSnack.open('saved', 'ok', {
    //         duration: 3000,
    //         verticalPosition: "top"
    //     })
    // })
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
        actionType: item.action_type,
        description: item.description,
        title: item.title
      })
    });

    return create_action_abilities
  }

  filterMeasuresByCategories(armor_tag: Attributes): Measure[] {
    if(this.creaturePayload) {
      const filteredMeasures = this.creaturePayload.measures.filter(item => item.attribute?.attr_cat === armor_tag)

      return filteredMeasures;
    }

    return []
  }
}
