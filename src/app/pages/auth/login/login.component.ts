import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../login.service";
import {LoginInterface} from "../../../../shared/interfaces/login.interface";
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {takeUntil} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('flipInOut', [
      transition(':enter', [
        style({ transform: 'rotateY(180deg)'}),
        animate('0.5s ease-in-out', style({ transform: 'rotateY(0deg)' })),
      ]),
      transition(':leave', [
        style({ transform: 'rotateY(0deg)' }),
        animate('0.5s ease-in-out', style({ transform: 'rotateY(180deg)' })),
      ]),
    ]),
  ],
})
export class LoginComponent extends DestroySubscription implements OnInit{
  form!: UntypedFormGroup
  showPassword: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: LoginService
  ) {
    super()
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [
        null, [Validators.required, Validators.email]
      ],
      password: [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  submitForm() {
    if(this.form.invalid) {
      return
    }

    const payload: LoginInterface = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }

    this.authService.login(payload).pipe(takeUntil(this.destroyStream$)).subscribe()
  }

  changeVisibility() {
    this.showPassword = !this.showPassword
  }
}
