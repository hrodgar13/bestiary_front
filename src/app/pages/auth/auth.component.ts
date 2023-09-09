import {Component} from '@angular/core';
import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', [
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-out', style({ transform: 'translateX(0%)' })),
          ]),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-out', style({ transform: 'translateX(-100%)' })),
          ]),
        ]),
        animateChild(),
      ]),
    ]),
  ],
})
export class AuthComponent{

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
