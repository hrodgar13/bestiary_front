import {Component, Input} from '@angular/core';
import {UniverseListItem} from "../../../../../shared/interfaces/universes/universe.interface";
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {UserService} from "../../user.service";
import {takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-universe-list',
  templateUrl: './universe-list.component.html',
  styleUrls: ['./universe-list.component.scss']
})
export class UniverseListComponent extends DestroySubscription{

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    super();
  }

  @Input() universes: UniverseListItem[] = []

  isHovered = false;
  hoveredUniverse: number | null = null
  loading: boolean = false;
  baseUrl = environment.baseUrl;

  onMouseEvent(state: boolean, universeId: number | null) {
    this.isHovered = state;
    this.hoveredUniverse = universeId
  }

  createUniverse() {
    this.loading = true
    this.userService.createUniverse().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.router.navigate(['../user/universes/' + data.id])
      this.loading = false
    }, err => {
      this.loading = false
    })
  }
}
