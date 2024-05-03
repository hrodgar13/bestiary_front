import {Component, Input} from '@angular/core';
import {DiceRollerService} from "../../../../../../shared/services/dice-roller.service";

@Component({
  selector: 'app-characteristic-block',
  templateUrl: './characteristic-block.component.html',
  styleUrls: ['./characteristic-block.component.scss']
})
export class CharacteristicBlockComponent {
  @Input() characteristicValue: number | null = 0;
  @Input() title: string = '';

  modificator: number = 0

  constructor(
    private diceRoller: DiceRollerService
  ) {
  }

  rollDice() {
    this.diceRoller.rollDice(1, 20, this.modificator)
  }

  calculateModificator(income: number | null): string {
    if(income) {
      const modif = Math.floor((income - 10) / 2)
      this.modificator = modif
      return modif < 0 ? `${modif}` : `+${modif}`
    }

    return '0'
  }
}
