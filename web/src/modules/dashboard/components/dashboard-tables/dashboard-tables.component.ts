import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '@modules/dashboard/services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sb-dashboard-tables',
  templateUrl: './dashboard-tables.component.html',
  styleUrls: ['dashboard-tables.component.scss'],
})
export class DashboardTablesComponent implements OnInit, OnDestroy {
  constructor(
    private dashboardService: DashboardService
  ) { }

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.dashboardService.dashboardData.subscribe((data: any) => {
      // TODO get relevant data
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
