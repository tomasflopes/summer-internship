/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as settingsComponents from './components';

/* Containers */
import * as settingsContainers from './containers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AppCommonModule,
    NavigationModule,
  ],
  providers: [],
  declarations: [...settingsContainers.containers, ...settingsComponents.components],
  exports: [...settingsContainers.containers, ...settingsComponents.components],
})
export class SettingsModule { }
