import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../../helpers/password-match.validators";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {DestroySubscription} from "../../helpers/destroy-subscribtion";

export const DICE_SIDES = [
  2,
  3,
  4,
  6,
  8,
  10,
  12,
  20,
  100
]

@Component({
  selector: 'app-create-dice-roll',
  templateUrl: './create-dice-roll.component.html',
  styleUrls: ['./create-dice-roll.component.scss']
})
export class CreateDiceRollComponent extends DestroySubscription implements OnInit {
  protected readonly DICE_SIDES = DICE_SIDES;
  form!: UntypedFormGroup

  constructor(
    private dialogRef: MatDialogRef<CreateDiceRollComponent>,
    private formBuilder: UntypedFormBuilder,
  ) {
    super()
  }

  validateNumberOnly(field: string, allowNegative: boolean) {
    this.form.get(field)?.valueChanges.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.form.get(field)?.setValue(this.sanitizeInput(data, allowNegative), {emitEvent: false});
    })
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      amt: [null, [Validators.required]],
      dice: [null, Validators.required],
      bonus: [null]
    })

    this.validateNumberOnly('amt', false)
    this.validateNumberOnly('bonus', true)
  }

  closeModal(param: string | null) {
    this.dialogRef.close(param)
  }

  copyResult() {
    if (this.form.invalid) {
      return
    }

    const payload = `{% roll_dice_amt="${this.form.get('amt')?.value}" roll_dice_side="${this.form.get('dice')?.value}" roll_bonus="${this.form.get('bonus')?.value}" %}`

    console.log(payload)
  }

  getFormValue(field: string) {
    let result = this.form.get(field)?.value

    if (field === 'bonus') {
      result = !result ? '' : result > 0 ? `+${result} ` : `${result}`;
      return result
    }

    return result ? result : 0
  }

  private sanitizeInput(data: string, allowNegative: boolean) {
    if (allowNegative) {
      return data.replace(/[^0-9-]|(?<!^)-+/g, '');
    } else {
      return data.replace(/[^0-9]/g, '');
    }
  }
}
