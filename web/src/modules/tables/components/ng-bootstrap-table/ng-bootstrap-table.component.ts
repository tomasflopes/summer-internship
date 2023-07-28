import { LowerCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { TestResult } from '@common/models';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { TestResultService } from '@modules/tables/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-ng-bootstrap-table',
  templateUrl: './ng-bootstrap-table.component.html',
  styleUrls: ['ng-bootstrap-table.component.scss'],
})
export class NgBootstrapTableComponent implements OnInit {
  @Input() pageSize = 8;

  results$!: Observable<TestResult[]>;
  total$!: Observable<number>;
  sortedColumn!: string;
  sortedDirection!: string;

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor(
    public testResultService: TestResultService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.testResultService.pageSize = this.pageSize;
    this.results$ = this.testResultService.results$;
    this.total$ = this.testResultService.total$;
  }

  onSort({ column, direction }: SortEvent) {
    this.sortedColumn = column;
    this.sortedDirection = direction;
    this.testResultService.sortColumn = column;
    this.testResultService.sortDirection = direction;
    this.changeDetectorRef.detectChanges();
  }

  navigateToTestPage(test: TestResult) {
    window.open(`/tests?name=${test.name}&className=${test.className}`, '_self');
  }
}
