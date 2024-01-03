import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-border-outline',
  templateUrl: './border-outline.component.html',
  styleUrls: ['./border-outline.component.scss']
})
export class BorderOutlineComponent {
  @Input() bg = '#15181F'
  @Input() height = 'h-full'
}
