/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as testsComponents from './components';

/* Containers */
import * as testsContainers from './containers';

/* Guards */
import * as testsGuards from './guards';
import { DashboardService } from '@modules/dashboard/services/dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AppCommonModule,
    NavigationModule,
  ],
  providers: [...testsGuards.guards],
  declarations: [...testsContainers.containers, ...testsComponents.components],
  exports: [...testsContainers.containers, ...testsComponents.components],
})
export class TestsModule { }
