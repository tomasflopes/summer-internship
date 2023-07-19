import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DashboardService } from '@modules/dashboard/services/dashboard.service';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sb-charts-bar',
  templateUrl: './charts-bar.component.html',
  styleUrls: ['charts-bar.component.scss'],
})
export class ChartsBarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myBarChart') myBarChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(
    private dashboardService: DashboardService
  ) { }

  private subscription: Subscription = new Subscription();
  private runs = [];

  ngOnInit() {
    this.subscription = this.dashboardService.dashboardData.subscribe((data: any) => {
      this.runs = data.map((run: any) => ({
        date: new Date(run.times.creation).toLocaleString('pt-PT'),
        passed: run.counters.passed,
        failed: run.counters.failed,
        skipped: run.counters.total - run.counters.passed - run.counters.failed,
      }))
    });
    console.log(this.runs)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    Chart.register(...registerables);

    this.chart = new Chart(this.myBarChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.runs.map((run: any) => run.date),
        datasets: [
          {
            label: 'Passed',
            backgroundColor: 'rgba(0,255,0,1)',
            borderColor: 'rgba(0,255,0,1)',
            data: this.runs.map((run: any) => run.passed),
          },
          {
            label: 'Failed',
            backgroundColor: 'rgba(255,0,0,1)',
            borderColor: 'rgba(255,0,0,1)',
            data: this.runs.map((run: any) => run.failed),
          },
          {
            label: 'Skipped',
            backgroundColor: 'rgba(255,255,0,1)',
            borderColor: 'rgba(255,255,0,1)',
            data: this.runs.map((run: any) => run.skipped),
          },
        ],
      },
      options: {
        scales: {
          x: {
            stacked: true,
            ticks: {
              maxTicksLimit: 6,
            },
          },
          y: {
            stacked: true,
            ticks: {
              maxTicksLimit: 5,
            },
          },
        },
      },
    });
  }
}
