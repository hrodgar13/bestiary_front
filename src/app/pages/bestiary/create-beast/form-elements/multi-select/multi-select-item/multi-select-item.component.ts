import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";
import {DestroySubscription} from "../../../../../../../shared/helpers/destroy-subscribtion";
import {takeUntil} from "rxjs";
import {Translation} from "../../../../../../../shared/interfaces/creature/get/translation";

@Component({
  selector: 'app-multi-select-item',
  templateUrl: './multi-select-item.component.html',
  styleUrls: ['./multi-select-item.component.scss']
})
export class MultiSelectItemComponent extends DestroySubscription implements OnInit{
  @Input() id!: number
  @Input() label!: Translation
  @Input() amt!: number
  @Input() msr!: boolean
  @Output() deleteItem = new EventEmitter<number>()

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
    if(data === 'en' || data === 'ua') {
      this.currentLanguageLabel = this.label[data]
    }
  }

  removeElement() {
    this.deleteItem.emit(this.id)
  }
}
