import { Component } from '@angular/core';

interface Route {
  route: string;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  routes: Route[] = [
    {
      title: 'Home',
      route: ''
    },
    {
      title: 'Bestiary',
      route: 'bestiary'
    },
    {
      title: 'Classes',
      route: 'classes'
    },
    {
      title: 'Races',
      route: 'races'
    },
    {
      title: 'Equipment',
      route: 'equipment'
    },
  ]
}
