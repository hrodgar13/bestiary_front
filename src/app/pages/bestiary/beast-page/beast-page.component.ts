import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {BestiaryService} from "../bestiary.service";
import {takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateTranslationAttribute} from "../../../../shared/interfaces/creature/create-attribute.interface";

export interface Creature {
  abilities: Action[]
  actions: Action[]
  alignment: OneAttribute
  armorClass: number
  armorTag: OneAttribute
  bonusActions: Action
  charisma: number
  conditionsImmunities: Measure[]
  construction: number
  creatureName: CreateTranslationAttribute
  dangerLevel: number
  description: CreateTranslationAttribute
  dexterity: number
  experience: string
  feelings: Measure[]
  hits: number
  hitsInDice: string
  id: number
  immunities: Measure[]
  intelligence: number
  isFinished: boolean
  languages: Measure[]
  legendaryActions: Action[]
  masteryBonus: number
  regions: Measure[]
  resists: Measure[]
  savingThrows: Measure[]
  size: OneAttribute
  skills: Measure[]
  speeds: Measure[]
  strength: number
  type: OneAttribute
  vulnerabilities: Measure[]
  wisdom: number
}

export interface Action {
  id: number
  title: CreateTranslationAttribute
  description: CreateTranslationAttribute
}

export interface Measure {
  id: number,
  amt: number | null
  isMeasureEnable: boolean | null
  attribute: OneAttribute
}


export interface OneAttribute {
  attrName: CreateTranslationAttribute
  id: number
}

@Component({
  selector: 'app-beast-page',
  templateUrl: './beast-page.component.html',
  styleUrls: ['./beast-page.component.scss']
})
export class BeastPageComponent extends DestroySubscription implements OnInit{

  creature!: Creature

  constructor(
    private readonly bestiaryService: BestiaryService,
    private readonly route: ActivatedRoute
  ) {
    super();
  }
  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroyStream$)).subscribe(param => {
      if(param['id']) {
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
}
