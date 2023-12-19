import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {BestiaryService} from "../bestiary.service";
import {takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-beast-page',
  templateUrl: './beast-page.component.html',
  styleUrls: ['./beast-page.component.scss']
})
export class BeastPageComponent extends DestroySubscription implements OnInit{

  // creature!: Creature
  //
  // constructor(
  //   private readonly bestiaryService: BestiaryService,
  //   private readonly attribute_code: ActivatedRoute
  // ) {
  //   super();
  // }
  ngOnInit(): void {
    // this.attribute_code.params.pipe(takeUntil(this.destroyStream$)).subscribe(param => {
    //   if(param['id']) {
    //     this.getCreature(param['id'])
    //   }
    // })
  }

  // private getCreature(id: number) {
  //   this.bestiaryService.getCreatureById(id).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
  //     this.creature = data
  //
  //     console.log(this.creature)
  //   })
  // }
  //
  // calculateModificator(income: number): string {
  //   const modif = (income - 10) / 2
  //
  //   return modif < 0 ? `${modif}` : `+${modif}`
  // }
}
