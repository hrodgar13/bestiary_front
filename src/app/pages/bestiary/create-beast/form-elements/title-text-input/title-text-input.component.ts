import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-title-text-input',
  templateUrl: './title-text-input.component.html',
  styleUrls: ['./title-text-input.component.scss']
})
export class TitleTextInputComponent {
  @Input()blockName: string = 'Actions';

}
