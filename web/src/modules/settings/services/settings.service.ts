import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TestRun } from "@common/models";
import { configs } from "configs";
import { BehaviorSubject, Observable, map, switchMap } from "rxjs";
import { Filter, Filters } from "../models";

@Injectable(
  { providedIn: 'root' }
)
export class SettingsService {
  private filters$: BehaviorSubject<Filters>;

  constructor(private http: HttpClient) {
    this.filters$ = new BehaviorSubject<Filters>({
      custom: [],
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
    return this.http
      .get(`${configs.apiUrl}/filters`)
      .pipe(
        map((data: any) => data),
        switchMap((data: Filters) => {
          return this.http.get(`${configs.apiUrl}/filters`).pipe(
            map(() => data)
          );
        }),
      );
  }

  updateFilter(filter: Filter, value: boolean): Observable<{}> {
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
