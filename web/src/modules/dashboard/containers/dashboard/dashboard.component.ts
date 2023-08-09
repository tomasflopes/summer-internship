import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '@modules/dashboard/services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private dashboardService: DashboardService) { }
  private subscription: Subscription = new Subscription();

  nOfTestsLoaded = 0;

  ngOnInit() {
    this.subscription = this.dashboardService.dashboardData.subscribe(d => {
      this.nOfTestsLoaded = d.length;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
