import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@modules/dashboard/services/dashboard.service';

@Component({
  selector: 'sb-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['charts.component.scss'],
  providers: []
})
export class ChartsComponent implements OnInit {
  constructor(private dashboardService: DashboardService) { }

  lastRunCreatedAt: string = "";

  ngOnInit() {
    this.dashboardService.dashboardData.subscribe((data: any) => {
      this.lastRunCreatedAt = new Date(data[data.length - 1].createdAt).toLocaleString('pt-PT');
    });
  }
}
