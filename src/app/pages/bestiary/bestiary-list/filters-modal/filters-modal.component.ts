import {Component, Inject, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CreatureFilter} from "../bestiary-list.component";
import {
    CreateTranslationAttribute
} from "../../../../../shared/interfaces/creature/create-update/create-attribute.interface";
import {CreatureFilterColumns} from "../../../../../shared/static/filter/creature-filter.enum";
import {CreatureFilterInterface, FilterLabel} from "../../../../../shared/interfaces/filter/creature-filter.interface";
import {forkJoin, take, takeUntil, tap} from "rxjs";
import {BestiaryService} from "../../bestiary.service";

@Component({
    selector: 'app-filters-modal',
    templateUrl: './filters-modal.component.html',
    styleUrls: ['./filters-modal.component.scss']
})
export class FiltersModalComponent extends DestroySubscription implements OnInit {

    filter: CreatureFilterInterface[] = []

    filterLabels: FilterLabel[] = []

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: CreatureFilter,
        private attributeService: BestiaryService
    ) {
        super();
    }

    ngOnInit(): void {
        this.generateFilter();

        this.checkFilterSubjectEmpty()
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
                        attr: Object.values(CreatureFilterColumns)[index],
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
        Object.values(CreatureFilterColumns).forEach(key => {
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
            if(!data) {
                this.produceFilterColumns()
            } else {
                this.filterLabels = data
            }
        })

        sbjSub.unsubscribe()
    }
}
