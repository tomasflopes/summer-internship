/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [],
    component: dashboardContainers.DashboardComponent,
    data: {
      title: 'Dashboard',
      breadcrumbs: [
        {
          text: 'Dashboard',
          active: true
        },
        {
          text: 'Charts',
          link: '/charts',
        },
      ],
    } as SBRouteData,
  },
];

@NgModule({
  imports: [DashboardModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
