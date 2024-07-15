import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {UserService} from "../user.service";
import {takeUntil} from "rxjs";
import {UniverseListItem} from "../../../../shared/interfaces/universes/universe.interface";

@Component({
  selector: 'app-universe-settings',
  templateUrl: './universe-settings.component.html',
  styleUrls: ['./universe-settings.component.scss']
})
export class UniverseSettingsComponent extends DestroySubscription implements OnInit{
  categories: string[] = [];
  universes: UniverseListItem[] = [];

  constructor(
    private readonly userService: UserService
  ) {
    super();
  }

  ngOnInit() {
    this.getFilterCategories()
    this.getUserUniverses()
  }

  private getFilterCategories() {
    return this.userService.getUniverseFilterCategories().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.categories = data
    })
  }

  private getUserUniverses() {
    return this.userService.getUniverses().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.universes = data
    })
  }
}
