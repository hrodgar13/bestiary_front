import {AbstractControl, ValidatorFn} from "@angular/forms";

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('passwordConfirm');

    if (password!.value !== confirmPassword!.value) {
      return { passwordMismatch: true };
    }

    return null;
  };
}
