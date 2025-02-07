import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {UserService} from "../user.service";
import {takeUntil} from "rxjs";
import {UniverseListItem} from "../../../../shared/interfaces/universes/universe.interface";
import {UniverseTagInterface} from "../../../../shared/interfaces/user/universe-tag.interface";

@Component({
  selector: 'app-universe-settings',
  templateUrl: './universe-settings.component.html',
  styleUrls: ['./universe-settings.component.scss']
})
export class UniverseSettingsComponent extends DestroySubscription implements OnInit{
  categories: UniverseTagInterface[] = [];
  universes: UniverseListItem[] = [];

  searchingCategories: UniverseTagInterface[] = []
  searchingName: string = ''

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
    return this.userService.getUniverses(this.searchingName, this.searchingCategories).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.universes = data
    })
  }

  setSearchInput($event: string) {
    this.searchingName = $event

    this.getUserUniverses()
  }

  setCategoriesFiltering($event: UniverseTagInterface[]) {
    this.searchingCategories = $event

    this.getUserUniverses()
  }
}
