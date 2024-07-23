import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs";
import {UserService} from "../../user.service";
import {
  UniverseInterface
} from "../../../../../shared/interfaces/universes/universe.interface";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.scss']
})
export class UniverseComponent extends DestroySubscription implements OnInit{

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
}
