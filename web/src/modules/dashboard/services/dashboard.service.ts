import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestRun } from '@common/models';
import { configs } from 'configs';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable(
  { providedIn: 'root' }
)
export class DashboardService {
  private dashboardData$ = new BehaviorSubject<TestRun[]>([]);

  constructor(private http: HttpClient) {
    this.refresh();
  }

  get dashboardData() {
    return this.dashboardData$.asObservable();
  }

  private fetchDashboardData(): Observable<TestRun[]> {
    return this.http
      .get(`${configs.apiUrl}/runs`)
      .pipe(
        map((data: any) => {
          const arr: TestRun[] = [];
          data.forEach((element: TestRun) => {
            arr.push({ ...element });
          });
          return arr;
        }),
        switchMap((data: TestRun[]) => {
          return this.http.get(`${configs.apiUrl}/runs`).pipe(
            map(() => data)
          );
        }),
      );
  }

  refresh() {
    this.fetchDashboardData().subscribe((data: TestRun[]) => {
      this.dashboardData$.next(data);
    });
  }
}
