import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {HEADER_ROUTES} from "../../../shared/static/header-routes.static";
import {Route} from "../../../shared/interfaces/route.interface";
import {AuthService} from "../../../shared/services/auth.service";
import {yearsPerPage} from "@angular/material/datepicker";
import {DestroySubscription} from "../../../shared/helpers/destroy-subscribtion";
import {takeUntil, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends DestroySubscription implements OnInit {
  @Output() onSwitchDrawer = new EventEmitter<any>()
  routes: Route[] = HEADER_ROUTES;
  isAuthed: boolean = this.auth.isAuthenticated();
  isAdmin = this.auth.isAdminAuthenticated();

  constructor(
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    super()
  }

  switchDrawer() {
    this.onSwitchDrawer.emit()
  }

  ngOnInit(): void {
    this.detectTokenChange()
  }

  detectTokenChange() {
    this.auth.accessToken$.pipe(takeUntil(this.destroyStream$)).subscribe((data) => {
      this.updateToken(data)
    })
  }

  logout() {
    this.auth.logout()
    this.router.navigate(['..'])
  }

  private updateToken(data: string | null) {
    this.isAuthed = !!data;
    this.isAdmin = this.auth.isAdminAuthenticated()
    this.cdr.detectChanges()
  }
}
