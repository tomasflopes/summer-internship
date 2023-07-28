/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { ChartsModule } from '@modules/charts/charts.module';

/* Components */
import * as testsComponents from './components';

/* Containers */
import * as testsContainers from './containers';

/* Guards */
import * as testsGuards from './guards';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AppCommonModule,
    NavigationModule,
    ChartsModule
  ],
  providers: [...testsGuards.guards],
  declarations: [...testsContainers.containers, ...testsComponents.components],
  exports: [...testsContainers.containers, ...testsComponents.components],
})
export class TestsModule { }
