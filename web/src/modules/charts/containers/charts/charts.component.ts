import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@modules/dashboard/services/dashboard.service';

@Component({
  selector: 'sb-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['charts.component.scss'],
  providers: [DashboardService]
})
export class ChartsComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}
