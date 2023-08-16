import { Component, OnInit } from '@angular/core';
import { Filters } from '@modules/settings/models';
import { SettingsService } from '@modules/settings/services/settings.service';
import { TestResultService } from '@modules/tables/services';

@Component({
  selector: 'test-filters',
  templateUrl: './test-filters.component.html',
  styleUrls: ['test-filters.component.scss'],
})
export class TestFiltersComponent implements OnInit {
  constructor(public testResultService: TestResultService, private settingsService: SettingsService) { }

  filters: Filters = {
    custom: [],
    default: [],
    selected: []
  }

  isFiltersContainerOpen = false;

  handleSelectedFilterChange(event: any) {
    this.testResultService.selectedFilter = event.target.value;
  }

  handleTestStatusFilterChange(event: any) {
    this.testResultService.testStatusFilter = event.target.value;
  }

  ngOnInit(): void {
    this.settingsService.filters.subscribe((filters) => {
      this.filters.default = filters.default.filter((filter) => filter.active);
      this.filters.selected = filters.selected.filter((filter) => filter.active);
      this.filters.custom = filters.custom.filter((filter) => filter.active);
    });
  }
}
