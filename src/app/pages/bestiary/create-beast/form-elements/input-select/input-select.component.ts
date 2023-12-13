import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";
import {takeUntil} from "rxjs";
import {BestiaryService} from "../../../bestiary.service";
import {AttributeService} from "../../attribute.service";
import {TranslocoService} from "@ngneat/transloco";
import {CreateTranslationAttribute} from "../../../../../../shared/interfaces/creature/create-update/create-attribute.interface";


@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ]
})
export class InputSelectComponent extends DestroySubscription implements ControlValueAccessor, OnInit{
  @Input() placeholder: string = '';
  @Input() route = ''

  @Output() currentSelected = new EventEmitter<CreateTranslationAttribute>()
  selectData: any[] = []
  currentLanguage = this.localeService.getActiveLang()
  _value: any;

  constructor(
    private readonly attrService: AttributeService,
    private localeService: TranslocoService,
    private bestiaryService: BestiaryService
  ) {
    super();
  }

  ngOnInit() {
    this.getSelectData()
    this.detectLanguageChange()
    this.bestiaryService.greenBtnChange$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      if(data === this.route) {
        this.getSelectData()
      }
    })
  }

  private propagateChange = (_: any) => {
  };

  writeValue(value: any) {
    this._value = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
  onInputChange(event: any) {
    const newValue = event

    if (newValue !== undefined) {
      this._value = newValue;

      const attr = this.selectData.find(item => item.id === newValue)['attrName']

      this.currentSelected.emit({en: attr.en, ua: attr.ua})
      this.propagateChange(this._value);
    }
  }

  private getSelectData() {
    this.attrService.getDataForSelect(this.route).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.selectData = data
    })
  }

  private detectLanguageChange() {
    this.localeService.langChanges$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.currentLanguage = data
    })
  }
}
