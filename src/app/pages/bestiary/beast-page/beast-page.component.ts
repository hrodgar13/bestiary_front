import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {BestiaryService} from "../bestiary.service";
import {takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Creature} from "../../../../shared/interfaces/creature/get/creature";
import {AttributeCode} from "../../../../shared/static/creature/attributes.code";
import {MeasureCode} from "../../../../shared/static/creature/measure.code";
import {Measure} from "../../../../shared/interfaces/creature/get/measure";
import {ActionAbilities} from "../../../../shared/static/creature/action-abilities.code";
import {ActionsAbilities} from "../../../../shared/interfaces/creature/get/actions-abilities";
import {environment} from "../../../../environments/environment";
import {TranslocoService} from "@ngneat/transloco";
import {DiceRollerService} from "../../../../shared/services/dice-roller.service";

@Component({
  selector: 'app-beast-page',
  templateUrl: './beast-page.component.html',
  styleUrls: ['./beast-page.component.scss']
})
export class BeastPageComponent extends DestroySubscription implements OnInit {
  AttributeCode = AttributeCode;
  MeasureCode = MeasureCode;

  currentLang: 'en' | 'ua' = 'en'

  creature!: Creature

  constructor(
    private readonly bestiaryService: BestiaryService,
    private readonly attribute_code: ActivatedRoute,
    private readonly transloco: TranslocoService,
    private diceRoller: DiceRollerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.defineCurrentLang()
    this.attribute_code.params.pipe(takeUntil(this.destroyStream$)).subscribe(param => {
      if (param['id']) {
        this.getCreature(param['id'])
      }
    })
  }

  private getCreature(id: number) {
    this.bestiaryService.getCreatureById(id).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.creature = data
    })
  }


  defineValueByAttribute(attr: AttributeCode) {
    return this.creature.attributes.find(item => item.attr_cat === attr)?.name[this.currentLang]
  }

  defineCreatureMeasures(msr: MeasureCode): Measure[] {
    return this.creature.measures.filter(item => item.measure_cat === msr)
  }

  defineActionAbilities(actionAbility: ActionAbilities): ActionsAbilities[] {
    return this.creature.action_abilities.filter(item => item.action_type === actionAbility)
  }

  protected readonly ActionAbilities = ActionAbilities;
  baseUrl: string = environment.baseUrl;

  validateEmptyName(speed: Measure) {
    return speed.attribute ? speed.attribute.name[this.currentLang] : ''
  }

  private defineCurrentLang() {
    const initLang = this.transloco.getActiveLang()

    if(initLang === 'en' || initLang === 'ua') {
      this.currentLang = initLang
    }

    this.transloco.langChanges$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      if(data === 'en' || data === 'ua') {
        this.currentLang = data
      }
    })
  }

  rollDice(amt: number) {
    this.diceRoller.rollDice(1,20, amt)
  }
}
