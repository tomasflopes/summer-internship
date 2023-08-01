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
    Chart.register(...registerables);

    this.chart = new Chart(this.myBarChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.runs.map(run => run.date),
        datasets: [
          {
            label: 'Passed',
            backgroundColor: '#1cc88a',
            borderColor: '#1db954',
            data: this.runs.map(run => run.passed),
          },
          {
            label: 'Failed',
            backgroundColor: '#e74a3b',
            borderColor: '#e83e8c',
            data: this.runs.map(run => run.failed),
          },
          {
            label: 'Skipped',
            backgroundColor: '#f6c23e',
            borderColor: '#f0ad4e',
            data: this.runs.map(run => run.skipped),
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
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
