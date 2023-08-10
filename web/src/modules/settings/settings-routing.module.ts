/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { SettingsModule } from './settings.module';

/* Containers */
import * as chartsContainers from './containers';


/* Routes */
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [],
    component: chartsContainers.SettingsComponent,
    data: {
      title: 'Settings',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Settings',
          active: true,
        },
      ],
    } as SBRouteData,
  },
];

@NgModule({
  imports: [SettingsModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class SettingsRoutingModule { }
