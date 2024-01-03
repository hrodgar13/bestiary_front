import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {BestiaryService} from "../../bestiary.service";
import {takeUntil} from "rxjs";
import {TranslocoService} from "@ngneat/transloco";
import {Attribute} from "../../../../../shared/interfaces/creature/get/attribute";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OutputCreatureItem} from "../../../../../shared/interfaces/filters/output-creature-item";
import {CreatureListFilter} from "../../../../../shared/interfaces/filters/creature-list-filter";

@Component({
  selector: 'app-filters-modal',
  templateUrl: './filters-modal.component.html',
  styleUrls: ['./filters-modal.component.scss']
})
export class FiltersModalComponent extends DestroySubscription implements OnInit {

  filters: CreatureListFilter[] = []
  selectedFilters: OutputCreatureItem[] = []
  currentLang: 'en' | 'ua' = 'en'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OutputCreatureItem[],
    public dialogRef: MatDialogRef<FiltersModalComponent>,
    private readonly bestiaryService: BestiaryService,
    private readonly translocoService: TranslocoService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getActiveLang()

    this.bestiaryService.getFilters().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.selectedFilters = this.data
      this.filters = data
    })
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.dialogRef.close(this.selectedFilters)
  }


  private getActiveLang() {
    const activeLang = this.translocoService.getActiveLang()

    if (activeLang === 'en' || activeLang === 'ua') {
      this.currentLang = activeLang
    }
    this.translocoService.langChanges$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      if (data === 'en' || data === 'ua') {
        this.currentLang = data
      }
    })
  }

  detectFilterActivity(filter_values: Attribute, filter_cat: string) {
    return !!this.selectedFilters.find(item => filter_values.id === item.attribute.id && item.msr_cat === filter_cat)
  }

  setFilter(attribute: Attribute, msr_cat: string) {
    this.selectedFilters.push({msr_cat, attribute})
  }

  removeFilter(filter_values: Attribute, filter_cat: string) {
    const idx = this.selectedFilters.findIndex(item => item.attribute.id === filter_values.id && item.msr_cat === filter_cat)

    if (idx !== -1) {
      this.selectedFilters.splice(idx, 1)
    }
  }
}
