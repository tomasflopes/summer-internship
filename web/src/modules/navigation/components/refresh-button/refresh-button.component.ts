import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '@modules/dashboard/services/dashboard.service';

@Component({
  selector: 'refresh-button',
  templateUrl: './refresh-button.component.html',
  styleUrls: ['refresh-button.component.scss'],
})
export class RefreshButtonComponent {
  constructor(private dashboardService: DashboardService) { }

  loading = false;

  refresh() {
    this.loading = true;

    this.dashboardService.refresh();

    // mock delay
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
