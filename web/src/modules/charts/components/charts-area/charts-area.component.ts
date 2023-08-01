import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TestRun } from '@common/models';
import { DashboardService } from '@modules/dashboard/services/dashboard.service';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sb-charts-area',
  templateUrl: './charts-area.component.html',
  styleUrls: ['charts-area.component.scss'],
})
export class ChartsAreaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myAreaChart') myAreaChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(
    private dashboardService: DashboardService
  ) { }
  private subscription: Subscription = new Subscription();
  private runs: {
    date: string;
    nOfTests: number;
  }[] = [];

  ngOnInit() {
    this.subscription = this.dashboardService.dashboardData.subscribe(data => {
      this.runs = data.map(run => ({
        date: new Date(run.times.creation).toLocaleString('pt-PT'),
        nOfTests: run.counters.total,
      }))
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    Chart.register(...registerables);

    this.chart = new Chart(this.myAreaChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.runs.map(run => run.date),
        datasets: [
          {
            label: 'No. of tests',
            tension: 0.3,
            backgroundColor: 'rgba(2,117,216,0.2)',
            borderColor: 'rgba(2,117,216,1)',
            pointRadius: 5,
            pointBackgroundColor: 'rgba(2,117,216,1)',
            pointBorderColor: 'rgba(255,255,255,0.8)',
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(2,117,216,1)',
            pointHitRadius: 50,
            pointBorderWidth: 2,
            fill: true,
            data: this.runs.map(run => run.nOfTests),
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 7,
            },
          },
          y: {
            ticks: {
              maxTicksLimit: 5,
            },
          },
        },
      },
    });
  }
}
