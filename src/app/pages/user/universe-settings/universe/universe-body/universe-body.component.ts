import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";
import {
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
        this.getUniverse(universeId)
      }
    })
  }

  private getUniverse(universeId: string) {
    this.userService.getUniverseById(universeId).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.universe = data
    })
  }

  sortedByOrder(information: UniverseStructureParagraphInterface[]) {
    information.sort((a, b) => a.order - b.order)

    return information
  }
}
