import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";
import {
  UniverseHatInterface,
  UniverseInterface,
  UniverseStructureParagraphInterface
} from "../../../../../../shared/interfaces/universes/universe.interface";
import {environment} from "../../../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../user.service";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-universe-body',
  templateUrl: './universe-body.component.html',
  styleUrls: ['./universe-body.component.scss']
})
export class UniverseBodyComponent extends DestroySubscription implements OnInit{
  universe!: UniverseInterface
  baseUrl: string = environment.baseUrl;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService
  ) {
    super();
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      const universeId = data['id']
      if(universeId) {
        this.detectHashedUniverse(universeId)
      }
    })
  }

  private getUniverse(universeId: number) {
    this.userService.getUniverseById(universeId).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.userService.universe$.next(data)
    })
  }


  sortedByOrder(information: UniverseStructureParagraphInterface[]) {
    information.sort((a, b) => a.order - b.order)

    return information
  }

  private detectHashedUniverse(universeId: number) {
    this.userService.universe$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      if(data && Number(data.id) === Number(universeId)) {
        this.universe = data
      } else {
        this.getUniverse(universeId)
      }
    })
  }
}
