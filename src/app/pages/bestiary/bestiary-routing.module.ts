import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BestiaryListComponent} from "./bestiary-list/bestiary-list.component";
import {CreateBeastComponent} from "./create-beast/create-beast.component";
import {AdminGuard} from "../../../shared/guards/admin.guard";
import {BeastPageComponent} from "./beast-page/beast-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: CreateBeastComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'edit/:id',
    component: CreateBeastComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'list',
    component: BestiaryListComponent,
  },
  {
    path: 'list/:id',
    component: BeastPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class BestiaryRoutingModule {
}
