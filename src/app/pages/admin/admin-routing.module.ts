import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {AdminGuard} from "../../../shared/guards/admin.guard";
import {UnfinishedCreaturesListComponent} from "./components/creatures-list/unfinished-creatures-list.component";
import {AttributesListComponent} from "./components/attributes-list/attributes-list.component";
import {AdminRequestsListComponent} from "./components/admin-requests-list/admin-requests-list.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivateChild: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'creatures',
        pathMatch: 'full'
      },
      {
        path: 'creatures',
        component: UnfinishedCreaturesListComponent
      },
      {
        path: 'attributes',
        component: AttributesListComponent
      },
      {
        path: 'requests',
        component: AdminRequestsListComponent
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
export class AdminRoutingModule { }
