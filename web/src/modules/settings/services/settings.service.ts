import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TestRun } from "@common/models";
import { configs } from "configs";
import { BehaviorSubject, Observable, map, of, switchMap } from "rxjs";
import { Filter, Filters } from "../models";
import { customFilters } from "@modules/tables/services/filters.custom";

@Injectable(
  { providedIn: 'root' }
)
export class SettingsService {
  private filters$: BehaviorSubject<Filters>;

  constructor(private http: HttpClient) {
    this.filters$ = new BehaviorSubject<Filters>({
      custom: customFilters,
      default: [],
      selected: []
    });
    this.fetchSettings().subscribe((data: Filters) => {
      this.filters$.next(data);
    });
  }

  get filters() {
    return this.filters$.asObservable();
  }

  private fetchSettings(): Observable<Filters> {
    const c = this.filters$.getValue().custom;
    return this.http
      .get(`${configs.apiUrl}/filters`)
      .pipe(
        map((data: any) => data),
        switchMap((data: Filters) => {
          return this.http.get(`${configs.apiUrl}/filters`).pipe(
            map(() => ({
              custom: c,
              default: data.default,
              selected: data.selected
            }))
          );
        }),
      );
  }

  updateFilter(filter: Filter, value: boolean): Observable<{}> {
    if (filter.action) {
      filter.active = value;
      return of({});
    }

    return this.http
      .patch(`${configs.apiUrl}/filters/${filter.name}`, {
        value
      });
  }

  refresh() {
    this.fetchSettings().subscribe((data: Filters) => {
      this.filters$.next(data);
    });
  }
}
