import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ContactUsComponent} from "../../../../../shared/modals/contact-us/contact-us.component";
import {AuthService} from "../../../../../shared/services/auth.service";

@Component({
  selector: 'app-tier-first',
  templateUrl: './tier-first.component.html',
  styleUrls: ['./tier-first.component.scss']
})
export class TierFirstComponent {
  isAuthed = this.authService.isAuthenticated();
  isAdmin = this.authService.isAdminAuthenticated();

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) {
  }

  openContactForm() {
    this.dialog.open(ContactUsComponent)
  }
}
