import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sb-dashboard-head',
  templateUrl: './dashboard-head.component.html',
  styleUrls: ['dashboard-head.component.scss'],
})
export class DashboardHeadComponent implements OnInit {
  @Input() title!: string;
  @Input() hideBreadcrumbs = false;

  constructor() { }
  ngOnInit() { }
}
