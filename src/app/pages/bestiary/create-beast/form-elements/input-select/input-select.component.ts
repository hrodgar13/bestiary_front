import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";
import {takeUntil} from "rxjs";
import {BestiaryService} from "../../../bestiary.service";
import {AttributeService} from "../../attribute.service";
import {TranslocoService} from "@ngneat/transloco";
import {CreateAttribute} from "../../../../../../shared/interfaces/creature/create-attribute.interface";


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

  @Output() currentSelected = new EventEmitter<CreateAttribute>()
  selectData: any[] = []
  currentLanguage = this.localeService.getActiveLang()
  _value: any;

  constructor(
    private readonly attrService: AttributeService,
    private localeService: TranslocoService
  ) {
    super();
  }

  ngOnInit() {
    this.getSelectData()
    this.detectLanguageChange()
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
      this.currentSelected.emit(this.selectData.find(item => item.id === newValue)[this.route])
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
