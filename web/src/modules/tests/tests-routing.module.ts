/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { TestsModule } from './tests.module';

/* Containers */
import * as testsContainers from './containers';

/* Guards */
import * as testsGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [],
    component: testsContainers.TestsComponent,
    data: {
      title: 'Tests',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Tests',
          active: true,
        }
      ],
    } as SBRouteData,
  },
];

@NgModule({
  imports: [TestsModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class TestsRoutingModule { }
