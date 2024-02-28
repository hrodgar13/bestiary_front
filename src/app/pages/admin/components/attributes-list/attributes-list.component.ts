import {Component, OnInit} from '@angular/core';
import {CreatureListFilter} from "../../../../../shared/interfaces/filters/creature-list-filter";
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {AdminService} from "../../admin.service";
import {takeUntil} from "rxjs";
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-attributes-list',
  templateUrl: './attributes-list.component.html',
  styleUrls: ['./attributes-list.component.scss']
})
export class AttributesListComponent extends DestroySubscription implements OnInit{
  filters: CreatureListFilter[] = [];
  currentLang: 'en' | 'ua' = 'en'


  constructor(
    private adminService: AdminService,
    private localeService: TranslocoService
  ) {
    super();
  }

  ngOnInit() {
    this.getFilters()
    this.detectLanguageChange()
  }

  getFilters() {
    this.adminService.getFilters().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.filters = data
    })
  }

  private detectLanguageChange() {
    this.localeService.langChanges$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      const activeLang: 'en' | 'ua' | string = data


      if(activeLang === 'en' ||activeLang === 'ua') {
        this.currentLang = activeLang
      }
    })
  }

}
