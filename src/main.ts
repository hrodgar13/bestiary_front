import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Injector } from '@angular/core';
import { AppModule } from './app/app.module';
import {DiceRollerService} from "./shared/services/dice-roller.service";

let appInjector: Injector; // Global variable to store the injector

// Function that can be called globally
(window as any).rollDiceGlobal = (amt: number, side: number, bonus: number) => {
  if (!appInjector) {
    console.error('Angular application has not been bootstrapped yet.');
    return;
  }
  const diceRollerService = appInjector.get(DiceRollerService);
  diceRollerService.rollDice(amt, side, bonus);
};

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(ref => {
    appInjector = ref.injector;
  })
  .catch(err => console.error(err));
