import {Component, Input} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-visualise-avatar',
  templateUrl: './visualise-avatar.component.html',
  styleUrls: ['./visualise-avatar.component.scss']
})
export class VisualiseAvatarComponent{
  @Input() avatarUrl?: string;
  @Input() maxw = '50px';

  baseUrl: string = environment.baseUrl;
}
