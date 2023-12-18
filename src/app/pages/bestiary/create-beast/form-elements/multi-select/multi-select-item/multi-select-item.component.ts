import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";
import {DestroySubscription} from "../../../../../../../shared/helpers/destroy-subscribtion";
import {takeUntil} from "rxjs";
import {Translation} from "../../../../../../../shared/interfaces/creature/get/translation";
import {Measure} from "../../../../../../../shared/interfaces/creature/get/measure";

@Component({
  selector: 'app-multi-select-item',
  templateUrl: './multi-select-item.component.html',
  styleUrls: ['./multi-select-item.component.scss']
})
export class MultiSelectItemComponent extends DestroySubscription implements OnInit{
  @Input() displayMeasure!: Measure
  @Output() deleteItem = new EventEmitter<Measure>()

  currentLanguageLabel: string | null = ''

  constructor(
    private readonly translocoService: TranslocoService
  ) {
    super()
  }

  ngOnInit() {
    this.translocoService.langChanges$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.defineCurrentLanguage(data)
    })
  }

  private defineCurrentLanguage(data: string = 'en') {
    if(this.displayMeasure.attribute) {
      if (data === 'en' || data === 'ua') {
        this.currentLanguageLabel = this.displayMeasure.attribute.name[data]
      }
    }
  }

  removeElement() {
    this.deleteItem.emit(this.displayMeasure)
  }
}
