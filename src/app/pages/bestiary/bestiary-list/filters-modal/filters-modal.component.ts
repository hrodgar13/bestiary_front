import {Component, Inject, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreatureFilterColumns} from "../../../../../shared/static/filter/creature-filter.enum";
import {CreatureFilterInterface, FilterLabel} from "../../../../../shared/interfaces/filter/creature-filter.interface";
import {forkJoin, takeUntil} from "rxjs";
import {BestiaryService} from "../../bestiary.service";
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-filters-modal',
  templateUrl: './filters-modal.component.html',
  styleUrls: ['./filters-modal.component.scss']
})
export class FiltersModalComponent extends DestroySubscription implements OnInit {

  currentLang: 'en' | 'ua' = 'en'

  filter: CreatureFilterInterface[] = []

  filterLabels: FilterLabel[] = []

  constructor(
    public dialogRef: MatDialogRef<FiltersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreatureFilterInterface[],
    private attributeService: BestiaryService,
    private translocoService: TranslocoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.filter = this.data

    this.generateFilter();

    this.checkFilterSubjectEmpty()

    this.detectLangChange()
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.dialogRef.close(this.filter)
  }

  private produceFilterColumns() {
    const requests = Object.values(CreatureFilterColumns).map(value => {

      return this.attributeService.getFilters(value);
    });

    forkJoin(requests)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe((responses: any[]) => {
        responses.forEach((data, index) => {
          this.filterLabels.push({
            attr: Object.keys(CreatureFilterColumns)[index],
            values: data,
          });
        });

        this.afterAllRequestsCompleted();
      });
  }

  private afterAllRequestsCompleted() {
    this.attributeService.filterSubject$.next(this.filterLabels)
  }

  private generateFilter() {
    Object.keys(CreatureFilterColumns).forEach(key => {
      const filterItem: CreatureFilterInterface = {
        attributeName: key,
        ids: [],
        mustContainAllSelected: null
      }
      this.filter.push(filterItem)
    });

  }

  private checkFilterSubjectEmpty() {
    const sbjSub = this.attributeService.filterSubject$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      if (!data) {
        this.produceFilterColumns()
      } else {
        this.filterLabels = data
      }
    })

    sbjSub.unsubscribe()
  }

  private detectLangChange() {
    const activeLang = this.translocoService.getActiveLang()

    if (activeLang === 'en' || activeLang === 'ua') {
      this.currentLang = activeLang
    }
  }

  setFilter(attr: string, id: number) {
    const filterIdx = this.filter.findIndex(filter => filter.attributeName === attr)

    this.filter[filterIdx].ids.push(id)
  }

  detectFilterActivity(attr: string, id: number): boolean {
    const filterIdx = this.filter.findIndex(filter => filter.attributeName === attr)

    return !!this.filter[filterIdx].ids.find(value => value === id)
  }

  removeFilter(attr: string, id: number) {
    const filterIdx = this.filter.findIndex(filter => filter.attributeName === attr)

    const attributeIdx = this.filter[filterIdx].ids.findIndex(item => item === id)

    this.filter[filterIdx].ids.splice(attributeIdx, 1)
  }
}
