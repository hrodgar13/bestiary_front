import {Component, Input, OnInit} from '@angular/core';
import {Attributes} from "../../../../../../shared/static/creature/attributes.code";
import {FormBuilder, UntypedFormGroup} from "@angular/forms";
import {CreatureService} from "../../creature.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";


@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent extends DestroySubscription implements OnInit {
  @Input() placeholder: string = '';
  @Input() route: Attributes | string = ''
  @Input() label: string = ''
  @Input() amt: boolean = false
  @Input() msr: boolean = true
  @Input() alwaysUseMsr: boolean = false
  measureForm!: UntypedFormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly creatureService: CreatureService,
    private readonly matSnack: MatSnackBar,
    private router: Router
  ) {
    super()
  }

  ngOnInit() {
    this.measureForm = this.formBuilder.group({
      value: [null],
      amount: [null],
      measure: [null]
    })
  }
}
