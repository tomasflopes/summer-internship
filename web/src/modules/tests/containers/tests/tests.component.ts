import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestResult } from '@common/models';
import { TestDuration } from '@modules/tests/models/duration.model';
import { configs } from 'configs';
import { map } from 'rxjs';

@Component({
  selector: 'sb-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['tests.component.scss'],
  providers: []
})
export class TestsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  currentRunIndex: number = 0;
  results: TestResult[] | null = null;
  durations: TestDuration[] | null = null;
  differences: {
    difference: number;
    percentage: number;
    color: string;
    icon: string;
  }[] = [];

  handleRunIndexChange(i: number) {
    this.currentRunIndex = i;
  }

  isActive(i: number) {
    return i === this.currentRunIndex;
  }

  ngOnInit() {
    const name = this.route.snapshot.queryParamMap.get('name');
    const className = this.route.snapshot.queryParamMap.get('className');

    this.http
      .get(`${configs.apiUrl}/tests?name=${name}&className=${className}`)
      .pipe(map(
        (data: any) => data.map((test: any) => ({
          id: test.id,
          name: test.name,
          outcome: test.outcome,
          status: test.outcome === 'Passed' ? '✅' : test.outcome === 'Failed' ? '❌' : '⏩',
          duration: test.duration.split(':')[2],
          startTime: new Date(test.startTime).toLocaleString('pt-PT'),
          endTime: new Date(test.endTime).toLocaleString('pt-PT'),
          testType: test.testType,
          description: test.description,
          output: test.output,
          runName: test.runName,
        }))
      ))
      .subscribe((data: any) => {
        this.results = data;
        this.durations = data.map((test: any) => ({
          runName: test.runName,
          date: test.startTime,
          duration: test.duration,
        }));
        if (this.durations)
          this.differences = this.durations.map((duration: any, index: number) => {
            if (index === 0) {
              return {
                difference: 0,
                percentage: 0,
                color: '#444',
                icon: ''
              };
            }
            return {
              difference: Math.round((duration.duration - this.durations![index - 1].duration) * 100) / 100,
              percentage: Math.round((duration.duration - this.durations![index - 1].duration) / this.durations![index - 1].duration * 100 * 100) / 100,
              color: duration.duration === this.durations![index - 1].duration ? '#444' : duration.duration > this.durations![index - 1].duration ? '#dc3545' : '#28a745',
              icon: duration.duration === this.durations![index - 1].duration ? '' : duration.duration > this.durations![index - 1].duration ? "🔴" : "🟢",
            }
          });
      });
  };
}
