import { LowerCasePipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { TestResult } from '@common/models';
import { DashboardService } from '@modules/dashboard/services/dashboard.service';
import { SortDirection } from '@modules/tables/directives';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { customFilters } from './filters.custom';

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
  selectedFilter: string;
  testStatusFilter: string;
  outputFilter: string;
  customFilter: string;
}

function compare(v1: string | number | undefined, v2: string | number | undefined) {
  if (v1 === undefined && v2)
    return -1;
  if (v1 && v2 === undefined)
    return 1;
  if (v1 === undefined || v2 === undefined)
    return 0;

  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(results: TestResult[], column: string, direction: string): TestResult[] {
  if (direction === '')
    return results;

  return [...results].sort((a, b) => {
    const res = compare(a[column], b[column]);
    return direction === 'asc' ? res : -res;
  });
}

function matches(result: TestResult, term: string, pipe: PipeTransform) {
  return result.className.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(result.description).includes(term) ||
    pipe.transform(result.name).includes(term);
}

function getOccurances(result: TestResult, term: string, pipe: PipeTransform): number {
  if (term === '') return 0;
  if (!result.output) return 0;

  const occurances = pipe.transform(result.output).match(new RegExp(term, 'g'));
  return occurances ? occurances.length : 0;
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
    selectedFilter: '',
    testStatusFilter: '',
    outputFilter: '',
    customFilter: '',
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
  set selectedFilter(selectedFilter: string) {
    this._set({ selectedFilter });
  }
  set testStatusFilter(testStatusFilter: string) {
    this._set({ testStatusFilter });
  }
  get outputFilter() {
    return this._state.outputFilter;
  }
  set outputFilter(outputFilter: string) {
    this._set({ outputFilter });
  }
  set customFilter(customFilter: string) {
    this._set({ customFilter });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm, testStatusFilter, selectedFilter, customFilter, outputFilter } = this._state;

    // 1. Get no. of occurances in output
    let results = this.lastResults.map(result => ({ // this needs to be done first to clear previous nOfOccurances
      ...result,
      nOfOccurances: getOccurances(result, outputFilter, this.pipe)
    }));

    // 2. sort
    results = sort(results, sortColumn, sortDirection);

    console.log({ results })
    // 3. apply filters
    if (selectedFilter)
      results = results.filter(result => result.className.toLowerCase().includes(selectedFilter.toLowerCase()));
    if (testStatusFilter)
      results = results.filter(result => result.outcome.toLowerCase().includes(testStatusFilter.toLowerCase()));
    if (customFilter) {
      const filter = customFilters.filter(f => f.name === customFilter)[0];
      if (filter.action)
        results = filter.action(results);
    }


    // 4. filter output 
    if (outputFilter !== '')
      results = results.filter(result => result.nOfOccurances > 0);

    // 5. filter keywords
    results = results.filter(result => matches(result, searchTerm.toLowerCase(), this.pipe));
    const total = results.length;

    // 6. paginate
    results = results.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ results, total });
  }
}
