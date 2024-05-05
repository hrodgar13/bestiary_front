import { Injectable, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SnackbarService} from "../components/dice-roll-snack/snackbar.service";
import {max} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DiceRollerService {
  onDiceRolled = new EventEmitter<string>(); // Event emitter to broadcast dice roll results

  constructor(private snackbarService: SnackbarService) {}

  rollDice(amount: number = 1, sides: number = 20, bonus: number = 0): void {
    let total = 0;
    let diceResults: string[] = [];
    for (let i = 0; i < amount; i++) {
      let roll = Math.floor(Math.random() * sides) + 1;
      if (roll === sides) { // Max roll
        diceResults.push(`[<span style="color:#E2A23B;">${roll}</span>]`);
      } else if (roll === 1) { // Min roll
        diceResults.push(`[<span style="color:#ec1818;">${roll}</span>]`);
      } else {
        diceResults.push(`[${roll}]`);
      }
      total += roll;
    }
    total += bonus;

    const message = this.createMessage(diceResults, bonus, total);
    this.snackbarService.show(message, 5000);
    this.onDiceRolled.emit(`Rolled ${amount}d${sides}+${bonus}: ${total}`);
  }

  private createMessage(diceResults: string[], bonus: number, total: number): string {
    // Prepare the message with dice results, highlighting max rolls and min rolls
    return `${diceResults.join(' + ')} ${!bonus ? '' : bonus > 0 ? '+'+bonus : bonus} = <span style="color:#FAFD5D; font-size: 32px;">${total}</span>`;
  }
}
