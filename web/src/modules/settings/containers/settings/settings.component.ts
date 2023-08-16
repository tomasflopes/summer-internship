import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@modules/dashboard/services/dashboard.service';
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
}