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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ng-bootstrap-table.component.html',
  styleUrls: ['ng-bootstrap-table.component.scss'],
})
export class NgBootstrapTableComponent implements OnInit {
  @Input() pageSize = 4;

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
}
