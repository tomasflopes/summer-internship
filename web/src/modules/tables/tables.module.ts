import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, LowerCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as tablesComponents from './components';

/* Containers */
import * as tablesContainers from './containers';

/* Directives */
import * as tablesDirectives from './directives';

/* Guards */
import * as tablesGuards from './guards';

/* Services */
import * as tablesServices from './services';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AppCommonModule,
    NavigationModule,
  ],
  providers: [
    LowerCasePipe,
    ...tablesServices.services,
    ...tablesGuards.guards,
    ...tablesDirectives.directives,
  ],
  declarations: [
    ...tablesContainers.containers,
    ...tablesComponents.components,
    ...tablesDirectives.directives,
  ],
  exports: [...tablesContainers.containers, ...tablesComponents.components],
})
export class TablesModule { }
