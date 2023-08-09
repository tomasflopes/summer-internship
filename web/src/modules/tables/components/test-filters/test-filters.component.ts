import { Component } from '@angular/core';
import { TestResultService } from '@modules/tables/services';

@Component({
  selector: 'test-filters',
  templateUrl: './test-filters.component.html',
  styleUrls: ['test-filters.component.scss'],
})
export class TestFiltersComponent {
  constructor(private testResultService: TestResultService) { }

  isFiltersContainerOpen = true;

  handleTestTypeFilterChange(event: any) {
    this.testResultService.testTypeFilter = event.target.value;
  }

  handleTestStatusFilterChange(event: any) {
    this.testResultService.testStatusFilter = event.target.value;
  }

  handleOutputFilterChange(event: any) {
    this.testResultService.outputFilter = event.target.value;
  }
}
