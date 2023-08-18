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

  private lastSelectedFilterRef: HTMLInputElement | null = null;
  private lastTestStatusFilterRef: HTMLInputElement | null = null;
  private lastCustomFilterRef: HTMLInputElement | null = null;

  filters: Filters = {
    custom: [],
    default: [],
    selected: []
  }

  isFiltersContainerOpen = false;

  handleSelectedFilterChange(event: Event) {
    const selectedFilterRef = event.target as HTMLInputElement;
    this.testResultService.selectedFilter = selectedFilterRef.value;
    this.lastSelectedFilterRef = selectedFilterRef;
  }

  handleTestStatusFilterChange(event: Event) {
    const testStatusFilterRef = event.target as HTMLInputElement;
    this.testResultService.testStatusFilter = testStatusFilterRef.value;
    this.lastTestStatusFilterRef = testStatusFilterRef;
  }

  handleCustomFilterChange(event: Event) {
    const customFilterRef = event.target as HTMLInputElement;
    this.testResultService.customFilter = customFilterRef.value;
    this.lastCustomFilterRef = customFilterRef;
  }

  handleResetFilters() {
    this.testResultService.selectedFilter = '';
    this.testResultService.testStatusFilter = '';
    this.testResultService.outputFilter = '';
    if (this.lastSelectedFilterRef) this.lastSelectedFilterRef.checked = false;
    if (this.lastTestStatusFilterRef) this.lastTestStatusFilterRef.checked = false;
    if (this.lastCustomFilterRef) this.lastCustomFilterRef.checked = false;
  }

  ngOnInit(): void {
    this.settingsService.filters.subscribe((filters) => {
      this.filters.default = filters.default.filter((filter) => filter.active);
      this.filters.selected = filters.selected.filter((filter) => filter.active);
      this.filters.custom = filters.custom.filter((filter) => filter.active);
    });
  }
}
