import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { NavigationService } from '@modules/navigation/services';

@Component({
  selector: 'sb-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  constructor(private navigationService: NavigationService) { }
  ngOnInit() { }

  toggleSideNav() {
    this.navigationService.toggleSideNav();
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.code === 'KeyB')
      return this.toggleSideNav();
  }
}
