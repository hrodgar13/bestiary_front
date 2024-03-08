import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-characteristic-block',
  templateUrl: './characteristic-block.component.html',
  styleUrls: ['./characteristic-block.component.scss']
})
export class CharacteristicBlockComponent {
  @Input() characteristicValue: number | null = 0;
  @Input() title: string = '';

  calculateModificator(income: number | null): string {
    if(income) {
      const modif = Math.floor((income - 10) / 2)

      return modif < 0 ? `${modif}` : `+${modif}`
    }

    return '0'
  }
}
