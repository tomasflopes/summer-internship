import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationService } from '@modules/navigation/services';
import { NavigationServiceStub } from '@testing/stubs';

import { BreadcrumbsComponent } from './breadcrumbs.component';

@Component({
  template: `
        <sb-breadcrumbs
            [someInput]="someInput"
            (someFunction)="someFunction($event)"
        ></sb-breadcrumbs>
    `,
})
class TestHostComponent {
  // someInput = 1;
  // someFunction(event: Event) {}
}

describe('BreadcrumbsComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let hostComponentDE: DebugElement;
  let hostComponentNE: Element;

  let component: BreadcrumbsComponent;
  let componentDE: DebugElement;
  let componentNE: Element;

  let navigationService: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, BreadcrumbsComponent],
      imports: [NoopAnimationsModule],
      providers: [{ provide: NavigationService, useValue: NavigationServiceStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    hostComponentDE = fixture.debugElement;
    hostComponentNE = hostComponentDE.nativeElement;

    componentDE = hostComponentDE.children[0];
    component = componentDE.componentInstance;
    componentNE = componentDE.nativeElement;

    navigationService = TestBed.inject(NavigationService);

    fixture.detectChanges();
  });

  it('should display the component', () => {
    expect(hostComponentNE.querySelector('sb-breadcrumbs')).toEqual(jasmine.anything());
  });
});
