import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestRun } from '@common/models';
import { configs } from 'configs';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable(
  { providedIn: 'root' }
)
export class DashboardService {
  dashboardData: Observable<TestRun[]>;

  constructor(private http: HttpClient) {
    this.dashboardData = this.fetchDashboardData();
  }

  private fetchDashboardData(): Observable<TestRun[]> {
    return this.http
      .get(`${configs.apiUrl}/tests`)
      .pipe(
        map((data: any) => {
          const arr: TestRun[] = [];
          data.forEach((element: TestRun) => {
            arr.push({ ...element });
          });
          return arr;
        }))
      .pipe(shareReplay());
  }
}
