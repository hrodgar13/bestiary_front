import {Component, OnInit} from '@angular/core';
import {CreatureListFilter} from "../../../../../shared/interfaces/filters/creature-list-filter";
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {AdminService} from "../../admin.service";
import {takeUntil} from "rxjs";
import {TranslocoService} from "@ngneat/transloco";
import {ConfirmDialogComponent} from "../../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  MatData,
  PropertyModalComponent
} from "../../../../../shared/components/property-modal/property-modal.component";
import {Translation} from "../../../../../shared/interfaces/creature/get/translation";
import {CharacteristicCode} from "../../../../../shared/static/creature/characteristic.code";
import {AttributeCode} from "../../../../../shared/static/creature/attributes.code";

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
    private localeService: TranslocoService,
    private dialog: MatDialog,
    private matSnack: MatSnackBar
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

  editAttribute(id: number, filter_cat: string) {
    const searchableFilter = this.filters.find(item => item.filter_cat === filter_cat)?.filter_values.find(item => item.id === id)

    if(searchableFilter) {
      this.openModal('Edit' || '', filter_cat, searchableFilter.name, searchableFilter.id, searchableFilter.scaling_from)
    }
  }

  openModal(title: string, attr_cat: string, initData: Translation, attributeId: number, initScaling: CharacteristicCode | null) {
    const data: MatData = {
      isScalable: this.detectScalableAttribute(attr_cat),
      title,
      attr_cat,
      initData,
      initScaling,
      attributeId
    }

    const dialogRef = this.dialog.open(PropertyModalComponent, {data})

    dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      const catIdx = this.filters.findIndex(item => item.filter_cat === attr_cat)

      const attrIdx = this.filters[catIdx].filter_values.findIndex(item => item.id === data.id)

      if(catIdx !== -1 && attrIdx !== -1) {
        this.filters[catIdx].filter_values[attrIdx] = data
      }
    })
  }

  removeAttribute(id: number, filter_cat: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {message: 'Are you sure you wanna delete this attribute?'}})

    dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      if(data) {
        this.deleteAttr(id)

        const catIdx = this.filters.findIndex(item => filter_cat === item.filter_cat)

        const filterIdx = this.filters[catIdx].filter_values.findIndex(item => item.id === id)

        if(filterIdx !== -1 && catIdx !== -1) {
          this.filters[catIdx].filter_values.splice(filterIdx, 1)
        }
      }
    })
  }

  private deleteAttr(id: number) {
    this.adminService.deleteFilter(id).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.matSnack.open(data.message, 'ok', {
        duration: 3000,
        verticalPosition: "top"
      })
    })
  }

  private detectScalableAttribute(attr_cat: string) {
    return attr_cat === AttributeCode.saving_throws || attr_cat === AttributeCode.skills;
  }
}
