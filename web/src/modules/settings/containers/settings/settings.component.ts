import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@modules/dashboard/services/dashboard.service';
import { SettingsService } from '@modules/settings/services/settings.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['settings.component.scss'],
  providers: []
})
export class SettingsComponent {
  constructor(private settinsService: SettingsService) { }

}
