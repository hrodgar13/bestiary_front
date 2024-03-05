import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {takeUntil} from "rxjs";
import {DestroySubscription} from "../../../helpers/destroy-subscribtion";
import {AttributeCode} from "../../../static/creature/attributes.code";
import {Attribute} from "../../../interfaces/creature/get/attribute";
import {TranslocoService} from "@ngneat/transloco";
import {ApiService} from "../../../services/api.service";


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
  @Input() attribute_code: AttributeCode | string = ''

  @Output() currentSelected = new EventEmitter<Attribute>()
  selectData: Attribute[] = []
  currentLanguage: 'en' | 'ua' = 'en'
  _value: any;

  constructor(
    private readonly apiService: ApiService,
    private localeService: TranslocoService,
  ) {
    super();
  }

  ngOnInit() {
    const activeLang: 'en' | 'ua' | string = this.localeService.getActiveLang()

    if(activeLang === 'en' ||activeLang === 'ua') {
      this.currentLanguage = activeLang
    }

    this.getSelectData()
    this.detectLanguageChange()
    this.apiService.greenBtnChange$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      if(data === this.attribute_code) {
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

      const attr = this.selectData.find(item => item.id === newValue)

      this.currentSelected.emit(attr)
      this.propagateChange(this._value);
    }
  }

  private getSelectData() {
    const damageRoutePreCheck = this.attribute_code.includes('damage') ? 'damage' : this.attribute_code

    this.apiService.getDataForSelect(damageRoutePreCheck).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.selectData = data
    })
  }

  private detectLanguageChange() {
    this.localeService.langChanges$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      const activeLang: 'en' | 'ua' | string = data


      if(activeLang === 'en' ||activeLang === 'ua') {
        this.currentLanguage = activeLang
      }
    })
  }
}
