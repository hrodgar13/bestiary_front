import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {UserProfile} from "../../../../shared/interfaces/user/user-profile.interface";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends DestroySubscription implements OnInit{
  user: UserProfile | null = null;

  constructor(
    private readonly authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.user = this.authService.getUserInfo()
  }

  getUserSubImage(type: string): string {
    if(type === 'The Adventurer') {
      return 'assets/images/adv-sub.png'
    }

    return 'assets/images/adv-sub.png'
  }
}
