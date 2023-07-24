import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '@modules/dashboard/services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sb-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  nOfTestRuns = 0;
  lastRun = {
    date: "",
    duration: "",
    total: 0,
    passed: 0,
    failed: 0,
    ignored: 0,
  }

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit() {
    this.subscription = this.dashboardService.dashboardData.subscribe((data: any) => {
      this.nOfTestRuns = data.length;
      const last = data[data.length - 1];
      this.lastRun = {
        date: new Date(last.times.creation).toLocaleDateString("pt-PT"),
        duration: last.times.duration,
        total: last.counters.total,
        passed: last.counters.passed,
        failed: last.counters.failed,
        ignored: last.counters.total - last.counters.passed - last.counters.failed,
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
