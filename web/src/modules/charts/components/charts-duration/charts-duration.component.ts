import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TestDuration } from '@modules/tests/models/duration.model';

import { Chart, registerables } from 'chart.js';
import { configs } from 'configs';

@Component({
  selector: 'charts-duration',
  templateUrl: './charts-duration.component.html',
  styleUrls: ['charts-duration.component.scss'],
})
export class ChartsDurationComponent implements AfterViewInit {
  @ViewChild('myDurationChart') myDurationChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  @Input() private durations: TestDuration[] = [];

  constructor() { }

  ngAfterViewInit() {
    Chart.register(...registerables);

    this.chart = new Chart(this.myDurationChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.durations.map(duration => duration.date),
        datasets: [
          {
            label: 'Duration (seconds)',
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
            data: this.durations.map(duration => duration.duration),
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 7,
            },
          },
          y: {
            min: 0,
            ticks: {
              maxTicksLimit: 5,
            },
          },
        },
      },
    });
  }
}
