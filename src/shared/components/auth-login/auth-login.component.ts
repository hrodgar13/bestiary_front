import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {takeUntil} from "rxjs";
import {DestroySubscription} from "../../helpers/destroy-subscribtion";
import {UserProfile} from "../../interfaces/user/user-profile.interface";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent  extends DestroySubscription implements OnInit {

  isAuthed: boolean = this.auth.isAuthenticated();
  isAdmin = this.auth.isAdminAuthenticated();
  user?: UserProfile;

  constructor(
    private router: Router,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    super()
  }

  ngOnInit(): void {
    this.detectTokenChange()
  }

  detectTokenChange() {
    this.auth.accessToken$.pipe(takeUntil(this.destroyStream$)).subscribe((data) => {
      this.updateToken(data)
      if(data) {
        this.user = this.auth.getUserInfo()
      }
    })
  }

  private updateToken(data: string | null) {
    this.isAuthed = !!data;
    this.isAdmin = this.auth.isAdminAuthenticated()
    this.cdr.detectChanges()
  }

  logout() {
    this.auth.logout()
    this.router.navigate(['..'])
  }
}
