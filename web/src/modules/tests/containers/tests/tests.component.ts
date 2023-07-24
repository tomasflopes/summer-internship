import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sb-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['tests.component.scss'],
  providers: []
})
export class TestsComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  id: string | null = "";

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
