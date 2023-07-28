import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestResult } from '@common/models';
import { configs } from 'configs';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'sb-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['tests.component.scss'],
  providers: []
})
export class TestsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  results: TestResult[] | null = null;

  ngOnInit() {
    const name = this.route.snapshot.queryParamMap.get('name');
    const className = this.route.snapshot.queryParamMap.get('className');

    return this.http
      .get(`${configs.apiUrl}/tests?name=${name}&className=${className}`)
      .subscribe((data: any) => {
        this.results = data;
      });
  };
}
