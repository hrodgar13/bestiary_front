import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormGroup} from "@angular/forms"
import {
  CreateAttributeMeasure
} from "../../../../shared/interfaces/creature/create-update/create-attribute-measure.interface";
import {CreatureService} from "./creature.service";
import {concatMap, of, switchMap, takeUntil} from "rxjs";
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Action, Creature, Measure} from "../beast-page/beast-page.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MultiFieldsENUM} from "../../../../shared/static/creature/multi-fields.enum";
import {ActionsAbilitiesENUM} from "../../../../shared/static/creature/action-abilities-fields.enum";
import {CreaturePayload} from "../../../../shared/interfaces/creature/create-update/creature-payload.interface";
import {MultiSelectList} from "../../../../shared/interfaces/creature/form-technical/multi-select.interface";
import {ActionsAndAbilities} from "../../../../shared/interfaces/creature/form-technical/action-abilities.interface";

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
      if (editableCreature && !params['id']) {
        localStorage.removeItem('creature-id')
        this.router.navigate(['bestiary/edit/' + editableCreature])
      } else {
        editableCreature = params['id']
      }

      this.getCreatureById(editableCreature)
    })


    setInterval(() => {
      if (!this.isFinished) {
        this.writeForm(false)
      }
    }, 5 * 60 * 1000)

  }

  private getCreatureById(editableCreature: string | null) {
    if (editableCreature) {
      this.creatureId = +editableCreature

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
    if (this.creatureForm.invalid) {
      return
    }

    this.creaturePayload = {
      isFinished: this.isFinished,
      creatureName: {
        ua: this.creatureForm.value.creatureNameUa,
        en: this.creatureForm.value.creatureNameEn
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

    if (this.creatureId) {
      this.creatureService.patchCreature(this.creatureId, this.creaturePayload).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        this.matSnack.open('Saved', '', {
          duration: 1500,
          verticalPosition: "top"
        })
      })
    } else {
      this.creatureService.createCreature(this.creaturePayload).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        this.matSnack.open('Saved', '', {
          duration: 1500,
          verticalPosition: "top"
        })
        this.creatureId = data.id
        localStorage.setItem('creature-id', data.id)
      })
    }

  }

  writeValueToCreature(route: MultiFieldsENUM, $event: CreateAttributeMeasure[]) {
    console.log($event)

    this.creaturePayload.multiSelects[route] = $event
    console.log(this.creaturePayload.multiSelects[route], route)
  }

  protected readonly ActionsAbilitiesENUM = ActionsAbilitiesENUM;

  setAbilityOrAction(abilities: ActionsAbilitiesENUM, $event: ActionsAndAbilities[]) {
    this.creaturePayload.actionsAbilities[abilities] = $event
  }

  convertMeasureToMultiSelect(param: Measure[] | null): MultiSelectList[] {
    if (!param) {
      return []
    }

    const attrs = param.map(item => {
      console.log(item)
      return {
        id: Number(item?.attribute?.attrName?.id),
        title: {en: item?.attribute?.attrName?.en, ua: item?.attribute?.attrName?.ua},
        msr: item.isMeasureEnable ? item.isMeasureEnable : false,
        amt: item.amt ? item.amt : 0
      }
    })

    return attrs
  }

  protected readonly takeUntil = takeUntil;

  convertTitle(abilities: Action[] | undefined): ActionsAndAbilities[] {
    if (abilities && abilities.length > 0) {
      return abilities.map(item => {
        return {
          title: item.title,
          description: item.description
        }
      })
    }

    return []
  }
}
