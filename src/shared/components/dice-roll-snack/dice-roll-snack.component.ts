import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-dice-roll-snack',
  templateUrl: './dice-roll-snack.component.html',
  styleUrls: ['./dice-roll-snack.component.scss']
})
export class DiceRollSnackComponent implements OnInit, AfterViewInit {
  @Input() message: SafeHtml = `<span></span>`;
  @Input() duration: number = 5000; // duration the snackbar will remain visible

  constructor() { }

  ngOnInit(): void {
    // this.safeMessage = this.sanitizer.bypassSecurityTrustHtml(this.message);
  }

  ngAfterViewInit() {
    // console.log(this.message)
    setTimeout(() => {
      this.close();
    }, this.duration);
  }

  close() {
    // Logic to remove the snackbar from display
    // This would typically involve communicating with the SnackbarService
  }
}
