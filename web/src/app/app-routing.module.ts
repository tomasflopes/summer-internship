import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Containers */
import * as dashboardContainers from '../modules/dashboard/containers';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('modules/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('modules/tables/tables-routing.module').then(m => m.TablesRoutingModule),
  },
  {
    path: 'tests',
    loadChildren: () =>
      import('modules/tests/tests-routing.module').then(m => m.TestsRoutingModule),
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('modules/charts/charts-routing.module').then(m => m.ChartsRoutingModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
      import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
