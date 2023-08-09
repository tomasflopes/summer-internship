import { DecimalPipe, LowerCasePipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { TestResult, TestRun } from '@common/models';
import { DashboardService } from '@modules/dashboard/services/dashboard.service';
import { SortDirection } from '@modules/tables/directives';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

interface SearchResult {
  results: TestResult[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
  testTypeFilter: string;
  testStatusFilter: string;
  outputFilter: string;
}

function compare(v1: string | undefined, v2: string | undefined) {
  if (v1 === undefined || v2 === undefined)
    return 0;
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(results: TestResult[], column: string, direction: string): TestResult[] {
  if (direction === '') {
    return results;
  } else {
    return [...results].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

const testTypeFilters: {
  [key: string]: (results: TestResult[]) => TestResult[]
} = {
  pow: (results: TestResult[]) => results.filter(result => result.className.includes('POW')),
  uid: (results: TestResult[]) => results.filter(result => result.className.includes('UID')),
  stress: (results: TestResult[]) => results.filter(result => result.className.includes('Stress')),
  all: (results: TestResult[]) => results,
}
const testStatusFilters: {
  [key: string]: (results: TestResult[]) => TestResult[]
} = {
  passed: (results: TestResult[]) => results.filter(result => result.outcome === 'Passed'),
  skipped: (results: TestResult[]) => results.filter(result => result.outcome === 'Skipped'),
  failed: (results: TestResult[]) => results.filter(result => result.outcome === 'Failed'),
}

function matches(result: TestResult, term: string, pipe: PipeTransform) {
  return (
    result.className.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(result.description).includes(term) ||
    pipe.transform(result.name).includes(term) ||
    pipe.transform(result.id).includes(term)
  );
}

@Injectable({ providedIn: 'root' })
export class TestResultService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _testRuns$ = new BehaviorSubject<TestResult[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private lastResults: TestResult[] = [];

  private _state: State = {
    page: 1,
    pageSize: 8,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    testTypeFilter: '',
    testStatusFilter: '',
    outputFilter: '',
  };

  constructor(private pipe: LowerCasePipe, private dashboardService: DashboardService) {
    this.dashboardService.dashboardData.subscribe(data => {
      this.lastResults = data[data.length - 1].testResults;
    });

    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(120),
        switchMap(() => this._search()),
        delay(120),
        tap(() => this._loading$.next(false))
      )
      .subscribe(result => {
        this._testRuns$.next(result.results);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get results$() {
    return this._testRuns$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  set page(page: number) {
    this._set({ page });
  }
  get pageSize() {
    return this._state.pageSize;
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  get searchTerm() {
    return this._state.searchTerm;
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }
  set testTypeFilter(testTypeFilter: string) {
    this._set({ testTypeFilter });
  }
  set testStatusFilter(testStatusFilter: string) {
    this._set({ testStatusFilter });
  }
  set outputFilter(outputFilter: string) {
    this._set({ outputFilter });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm, testStatusFilter, testTypeFilter } = this._state;

    // 1. sort
    let results = sort(this.lastResults, sortColumn, sortDirection);
    console.log(results);

    // 2. filter
    if (testTypeFilters[testTypeFilter] !== undefined)
      results = testTypeFilters[testTypeFilter](results);
    if (testStatusFilters[testStatusFilter] !== undefined)
      results = testStatusFilters[testStatusFilter](results);
    if (this._state.outputFilter !== '')
      results = results.filter(result => result.output?.includes(this._state.outputFilter));

    // 2.1. filter keywords
    results = results.filter(result => matches(result, searchTerm.toLowerCase(), this.pipe));
    const total = results.length;

    // 3. paginate
    results = results.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ results, total });
  }
}
