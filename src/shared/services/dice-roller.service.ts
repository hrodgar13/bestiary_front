import { Injectable, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DiceRollerService {
  onDiceRolled = new EventEmitter<string>(); // Event emitter to broadcast dice roll results

  constructor(private snackBar: MatSnackBar) {}

  rollDice(amount: number, sides: number, bonus: number): void {
    let total = 0;
    for (let i = 0; i < amount; i++) {
      total += Math.floor(Math.random() * sides) + 1;
    }
    total += bonus;
    this.snackBar.open(`Dice roll result: ${total}`, '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
    this.onDiceRolled.emit(`Rolled ${amount}d${sides}+${bonus}: ${total}`);
  }
}
