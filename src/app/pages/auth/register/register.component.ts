import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../login.service";
import {takeUntil} from "rxjs";
import {passwordMatchValidator} from "../../../../shared/helpers/password-match.validators";
import {Register} from "../../../../shared/interfaces/user/register.interface";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('flipInOut', [
      transition(':enter', [
        style({ transform: 'rotateY(180deg)' }),
        animate('0.5s ease-in-out', style({ transform: 'rotateY(0deg)' })),
      ]),
      transition(':leave', [
        style({ transform: 'rotateY(0deg)' }),
        animate('0.5s ease-in-out', style({ transform: 'rotateY(180deg)' })),
      ]),
    ]),
  ],
})
export class RegisterComponent extends DestroySubscription implements OnInit{
  form!: UntypedFormGroup
  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;

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
      password: [null, [Validators.required, Validators.minLength(8)]],
      passwordConfirm: [null, [Validators.required, Validators.minLength(8)]]
    }, {validators:passwordMatchValidator ()})
  }

  submitForm() {
    if(this.form.invalid) {
      return
    }

    const payload: Register = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }

    this.authService.register(payload).pipe(takeUntil(this.destroyStream$)).subscribe()
  }

  changeVisibility() {
    this.showPassword = !this.showPassword
  }

  changeConfirmVisibility() {
    this.showPassword = !this.showPassword
  }
}
