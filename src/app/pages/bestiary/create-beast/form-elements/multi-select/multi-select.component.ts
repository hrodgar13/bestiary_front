import {Component, Input, OnInit} from '@angular/core';
import {Attributes} from "../../../../../../shared/static/creature/attributes.code";


@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() route: Attributes | string = ''
  @Input() label: string = ''
  @Input() amt: boolean = false
  @Input() msr: boolean = true
  @Input() alwaysUseMsr: boolean = false

  ngOnInit() {
  }
}
