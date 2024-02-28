import { Component } from '@angular/core';
import {OutputCreatureItem} from "../../../../../shared/interfaces/filters/output-creature-item";
import {AdminService} from "../../admin.service";

@Component({
  selector: 'app-unfinished-creatures-list',
  templateUrl: './unfinished-creatures-list.component.html',
  styleUrls: ['./unfinished-creatures-list.component.scss']
})
export class UnfinishedCreaturesListComponent {
  isAdminAuthenticated = this.adminService.isAdmin();
  creatureFilter: OutputCreatureItem[] = []

  perPage = 30;
  search = '';

  constructor(
    private adminService: AdminService
  ) {
  }

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
