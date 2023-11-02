import {Component, OnInit} from '@angular/core';
import {BestiaryService} from "../bestiary.service";

@Component({
  selector: 'app-bestiary-list',
  templateUrl: './bestiary-list.component.html',
  styleUrls: ['./bestiary-list.component.scss']
})
export class BestiaryListComponent implements OnInit{
  isAdminAuthenticated = false;
  searchInput: any;

  constructor(
    private readonly bestiaryService: BestiaryService
  ) {}

  ngOnInit() {
    this.isAdminAuthenticated = this.bestiaryService.isAdmin();
  }

  clearInputFilter() {
    this.searchInput = ''
  }
}
