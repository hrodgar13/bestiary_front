import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-danger-separator',
  templateUrl: './danger-separator.component.html',
  styleUrls: ['./danger-separator.component.scss']
})
export class DangerSeparatorComponent {
  @Input() dangerLVL: number | string = 0
}
