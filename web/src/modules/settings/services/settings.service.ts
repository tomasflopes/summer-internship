import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { configs } from "configs";
import { BehaviorSubject, Observable, map, mergeMap, of, switchMap } from "rxjs";
import { Filter, Filters } from "../models";
import { customFilters } from "@modules/tables/services/filters.custom";

@Injectable(
  { providedIn: 'root' }
)
export class SettingsService {
  private filters$: BehaviorSubject<Filters> = new BehaviorSubject<Filters>({
    custom: customFilters,
    default: [],
    selected: []
  });

  constructor(private http: HttpClient) {
    this.refresh();
  }

  get filters() {
    return this.filters$.asObservable();
  }

  private fetchSettings(): Observable<Filters> {
    const c = this.filters$.getValue().custom;

    return this.http
      .get(`${configs.apiUrl}/filters`)
      .pipe(
        map((data: any) => {
          // ? workaround to remove duplicates (should be fixed in fetching logic)
          const selected = data.selected.filter((filter: Filter, index: number, self: Filter[]) =>
            index === self.findIndex((f: Filter) => (
              f.name === filter.name
            ))
          );

          return {
            custom: c,
            default: data.default,
            selected: selected
          }
        })
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
