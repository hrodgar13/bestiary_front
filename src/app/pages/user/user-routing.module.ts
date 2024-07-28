import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../../shared/guards/auth.guard";
import {UserComponent} from "./user.component";
import {ProfileComponent} from "./profile/profile.component";
import {UniverseSettingsComponent} from "./universe-settings/universe-settings.component";
import {UniverseComponent} from "./universe-settings/universe/universe.component";
import {
  HeaderConstructorComponent
} from "./universe-settings/universe-constructor/header-constructor/header-constructor.component";
import {UniverseBodyComponent} from "./universe-settings/universe/universe-body/universe-body.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user',
    pathMatch: 'full'
  },
  {
    path: '',
    component: UserComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'universes',
        component: UniverseSettingsComponent
      },
      {
        path: 'universe',
        component: UniverseComponent,
        children: [
          {
            path: ':id',
            component: UniverseBodyComponent
          },
          {
            path: ':id/header',
            component: HeaderConstructorComponent
          }
        ]
      }
    ]
  },
  ];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
