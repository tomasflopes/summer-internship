import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configs } from 'configs';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable(
  { providedIn: 'root' }
)
export class DashboardService {
  dashboardData: Observable<any[]>;

  constructor(private http: HttpClient) {
    this.dashboardData = this.fetchDashboardData();
  }

  private fetchDashboardData() {
    return this.http
      .get(`${configs.apiUrl}/tests`)
      .pipe(
        map((data: any) => {
          const arr: any[] = [];
          data.forEach((element: any) => {
            arr.push({ ...element });
          });
          return arr;
        }))
      .pipe(shareReplay());
  }
}
