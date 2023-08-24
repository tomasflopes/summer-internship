import { Component, OnInit } from '@angular/core';
import { Filter, Filters } from '@modules/settings/models';
import { SettingsService } from '@modules/settings/services/settings.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['settings.component.scss'],
  providers: []
})
export class SettingsComponent implements OnInit {
  constructor(private settingsService: SettingsService) { }

  filters: Filters = {
    custom: [],
    default: [],
    selected: []
  };

  private currentOpenIndex = -1;

  ngOnInit() {
    this.settingsService.filters.subscribe((data: any) => {
      this.filters = {
        custom: data.custom || [],
        default: data.default || [],
        selected: data.selected || [],
      }
    });
  }

  updateFilter(filter: Filter, value: boolean) {
    this.settingsService.updateFilter(filter, value).subscribe(() => {
      this.settingsService.refresh();
    });
  }

  isFilterDescriptionOpen(index: number) {
    return this.currentOpenIndex === index;
  }

  toggleFilterDescription(index: number) {
    if (this.currentOpenIndex === index) {
      this.currentOpenIndex = -1;
    } else {
      this.currentOpenIndex = index;
    }
  }
}
