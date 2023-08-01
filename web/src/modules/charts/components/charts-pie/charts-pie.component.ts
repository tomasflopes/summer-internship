import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DashboardService } from '@modules/dashboard/services/dashboard.service';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sb-charts-pie',
  templateUrl: './charts-pie.component.html',
  styleUrls: ['charts-pie.component.scss'],
})
export class ChartsPieComponent implements OnInit, AfterViewInit {
  @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart<"pie", number[], string>;

  constructor(
    private dashboardService: DashboardService
  ) { }

  private subscription: Subscription = new Subscription();
  private runs: {
    date: string;
    passed: number;
    failed: number;
    skipped: number;
  }[] = [];

  ngOnInit() {
    this.subscription = this.dashboardService.dashboardData.subscribe(data => {
      this.runs = data.map(run => ({
        date: new Date(run.times.creation).toLocaleString('pt-PT'),
        passed: run.counters.passed,
        failed: run.counters.failed,
        skipped: run.counters.total - run.counters.passed - run.counters.failed,
      }))
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.chart = new Chart(this.myPieChart.nativeElement, {
      type: 'pie',
      options: {
        maintainAspectRatio: false,
        responsive: true,
      },
      data: {
        labels: ['Passed', 'Failed', 'Skipped'],
        datasets: [
          {
            data: [this.runs[0]?.passed, this.runs[0]?.failed, this.runs[0]?.skipped],
            backgroundColor: ['#1cc88a', '#e74a3b', '#f6c23e'],
            hoverBackgroundColor: ['#17a673', '#e74a3b', '#f6c23e'],
            hoverBorderColor: 'rgba(234, 236, 244, 1)',
          },
        ]
      }
    });
  }
}
