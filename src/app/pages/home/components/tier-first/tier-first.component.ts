import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ContactUsComponent} from "../../../../../shared/modals/contact-us/contact-us.component";
import {AuthService} from "../../../../../shared/services/auth.service";
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-tier-first',
  templateUrl: './tier-first.component.html',
  styleUrls: ['./tier-first.component.scss']
})
export class TierFirstComponent extends DestroySubscription implements OnInit {
  isAuthed = this.authService.isAuthenticated();
  isAdmin = this.authService.isAdminAuthenticated();

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    super()
  }

  ngOnInit() {
    this.authService.accessToken$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      if(data === null) {
        this.isAuthed = false;
        this.isAdmin = false;
      }
      this.cdr.detectChanges()
    })
  }

  openContactForm() {
    this.dialog.open(ContactUsComponent)
  }
}
