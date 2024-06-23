import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-dice-roll-snack',
  templateUrl: './dice-roll-snack.component.html',
  styleUrls: ['./dice-roll-snack.component.scss']
})
export class DiceRollSnackComponent implements AfterViewInit {
  @Input() message: SafeHtml = `<span></span>`;
  @Input() duration: number = 5000; // duration the snackbar will remain visible

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.close();
    }, this.duration);
  }

  close() {
    // Logic to remove the snackbar from display
    // This would typically involve communicating with the SnackbarService
  }
}
