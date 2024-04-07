import { Component } from '@angular/core';
import {Route} from "../../../shared/interfaces/route.interface";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  routes: Route[] = [
    {
      route: 'creatures',
      title: 'Creatures'
    },
    {
      route: 'attributes',
      title: 'Attributes'
    },
    {
      title: 'Requests',
      route: 'requests'
    },
  ];

}
