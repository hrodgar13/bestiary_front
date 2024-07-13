import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../../shared/guards/auth.guard";
import {UserComponent} from "./user.component";
import {ProfileComponent} from "./profile/profile.component";
import {UniverseSettingsComponent} from "./universe-settings/universe-settings.component";

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
