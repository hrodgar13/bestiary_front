import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";
import {takeUntil} from "rxjs";
import {BestiaryService} from "../../../bestiary.service";
import {TranslocoService} from "@ngneat/transloco";
import {Attributes} from "../../../../../../shared/static/creature/attributes.code";
import {CreatureService} from "../../creature.service";
import {CreateActionAbility} from "../../../../../../shared/interfaces/creature/create/create-action-ability";
import {Attribute} from "../../../../../../shared/interfaces/creature/get/attribute";


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
  @Input() route: Attributes | string = ''

  @Output() currentSelected = new EventEmitter<Attribute>()
  selectData: Attribute[] = []
  currentLanguage: 'en' | 'ua' = 'en'
  _value: any;

  constructor(
    private readonly creatureService: CreatureService,
    private localeService: TranslocoService,
    private bestiaryService: BestiaryService
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

      const attr = this.selectData.find(item => item.id === newValue)

      this.currentSelected.emit(attr)
      this.propagateChange(this._value);
    }
  }

  private getSelectData() {
    this.creatureService.getDataForSelect(this.route).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
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
