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

@Component({
  selector: 'app-beast-page',
  templateUrl: './beast-page.component.html',
  styleUrls: ['./beast-page.component.scss']
})
export class BeastPageComponent extends DestroySubscription implements OnInit {
  AttributeCode = AttributeCode;
  MeasureCode = MeasureCode;

  creature!: Creature

  constructor(
    private readonly bestiaryService: BestiaryService,
    private readonly attribute_code: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.attribute_code.params.pipe(takeUntil(this.destroyStream$)).subscribe(param => {
      if (param['id']) {
        this.getCreature(param['id'])
      }
    })
  }

  private getCreature(id: number) {
    this.bestiaryService.getCreatureById(id).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.creature = data

      console.log(this.creature)
    })
  }

  //
  calculateModificator(income: number | null): string {
    if(income) {
      const modif = Math.floor((income - 10) / 2)

      return modif < 0 ? `${modif}` : `+${modif}`
    }

    return '0'
  }


  defineValueByAttribute(attr: AttributeCode) {
    return this.creature.attributes.find(item => item.attr_cat === attr)?.name['en']
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
    return speed.attribute ? speed.attribute.name['en'] : ''
  }
}
