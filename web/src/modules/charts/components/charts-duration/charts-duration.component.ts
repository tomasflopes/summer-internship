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

import { Chart, registerables } from 'chart.js';
import { configs } from 'configs';

@Component({
  selector: 'charts-duration',
  templateUrl: './charts-duration.component.html',
  styleUrls: ['charts-duration.component.scss'],
})
export class ChartsDurationComponent implements OnInit, AfterViewInit {
  @ViewChild('myDurationChart') myDurationChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  @Input() private testName: string = "";
  @Input() private className: string = "";

  constructor(private http: HttpClient) { }

  private durations: {
    date: string;
    duration: number;
  }[] = [];

  ngOnInit() {
    this.http
      .get(`${configs.apiUrl}/tests?name=${this.testName}&className=${this.className}`)
      .subscribe((data: any) => {
        this.durations = data.map((test: any) => {
          return {
            date: new Date(test.startTime).toLocaleString('pt-PT'),
            duration: parseFloat(test.duration.split(':')[2])
          };
        });
        console.log(this.durations)
      });
  }

  ngAfterViewInit() {
    Chart.register(...registerables);

    this.chart = new Chart(this.myDurationChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.durations.map(duration => duration.date),
        datasets: [
          {
            label: 'Duration',
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
            ticks: {
              maxTicksLimit: 5,
            },
          },
        },
      },
    });
  }
}
