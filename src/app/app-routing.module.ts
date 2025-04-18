import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./main-layout/main-layout.component";

const routes: Routes = [
    {
      path: '',
      component: MainLayoutComponent,
      children: [
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        },
        {
          path: 'home',
          loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)
        },
        {
          path: 'auth',
          loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule)
        },
        {
          path: 'bestiary',
          loadChildren: () => import('./pages/bestiary/bestiary.module').then((m) => m.BestiaryModule)
        },
        {
          path: 'admin',
          loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule)
        },
        {
          path: 'user',
          loadChildren: () => import('./pages/user/user.module').then((m) => m.UserModule)
        }
      ]
    }
  ]
;

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
