/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { fontAwesomeSolidIcons } from './icons.font-awesome-solid';
import { fontAwesomeRegularIcons } from './icons.font-awesome-regular';
import { fontAwesomeBrandsIcons } from './icons.font-awesome-brands';

@NgModule({
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    const solidIcons = Object.keys(fontAwesomeSolidIcons).map(key => fontAwesomeSolidIcons[key]);
    const regularIcons = Object.keys(fontAwesomeRegularIcons).map(key => fontAwesomeRegularIcons[key]);
    const brandIcons = Object.keys(fontAwesomeBrandsIcons).map(key => fontAwesomeBrandsIcons[key]);

    library.addIcons(
      ...solidIcons,
      ...regularIcons,
      ...brandIcons
    );
  }
}
