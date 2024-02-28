import {Component} from '@angular/core';
import {OutputCreatureItem} from "../../../../shared/interfaces/filters/output-creature-item";
@Component({
  selector: 'app-bestiary-list',
  templateUrl: './bestiary-list.component.html',
  styleUrls: ['./bestiary-list.component.scss']
})
export class BestiaryListComponent{
  isAdminAuthenticated = false;


  creatureFilter: OutputCreatureItem[] = []

  perPage = 30;
  search = '';

  setFilter(filter: OutputCreatureItem[]) {
    this.creatureFilter = [...filter]
  }

  setPerPage(perPage: number) {
    this.perPage = perPage
  }

  setSearch(search: string) {
    this.search = search
  }
}
