import {Component, Inject, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CreatureFilter} from "../bestiary-list.component";
import {CreateTranslationAttribute} from "../../../../../shared/interfaces/creature/create-update/create-attribute.interface";
import {CreatureFilterColumns} from "../../../../../shared/static/filter/creature-filter.enum";
import {CreatureFilterInterface, FilterLabel} from "../../../../../shared/interfaces/filter/creature-filter.interface";
import {AttributeService} from "../../../../../shared/services/attribute.service";
import {take, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-filters-modal',
  templateUrl: './filters-modal.component.html',
  styleUrls: ['./filters-modal.component.scss']
})
export class FiltersModalComponent extends DestroySubscription implements OnInit{

  filter: CreatureFilterInterface[] = []

  filterLabels: FilterLabel[] = []

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: CreatureFilter,
      private attributeService: AttributeService
  ) {
    super();
  }

  ngOnInit(): void {
     this.produceFilterColumns()
  }

  private produceFilterColumns() {
    Object.values(CreatureFilterColumns).forEach(value => {
      this.generateFilter(value)
      this.generateLabel(value)
    })
  }

  private generateFilter(key: string) {
    const filterItem: CreatureFilterInterface = {
      attributeName: key,
      ids: [],
      mustContainAllSelected: null
    }
    this.filter.push(filterItem)
  }

  private generateLabel(key: string) {
    this.attributeService.getAttribute(key).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.filterLabels.push({
        attr: key,
        values: data
      })

      console.log(this.filterLabels)
    })
  }
}
