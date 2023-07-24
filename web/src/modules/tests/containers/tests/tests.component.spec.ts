import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { TestsComponent } from './tests.component';

@Component({
  template: `
        <sb-charts [someInput]="someInput" (someFunction)="someFunction($event)"></sb-charts>
    `,
})
class TestHostComponent {
  // someInput = 1;
  // someFunction(event: Event) {}
}

describe('TestsComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let hostComponentDE: DebugElement;
  let hostComponentNE: Element;

  let component: TestsComponent;
  let componentDE: DebugElement;
  let componentNE: Element;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, TestsComponent],
      imports: [NoopAnimationsModule, HttpClientModule],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    hostComponentDE = fixture.debugElement;
    hostComponentNE = hostComponentDE.nativeElement;

    componentDE = hostComponentDE.children[0];
    component = componentDE.componentInstance;
    componentNE = componentDE.nativeElement;

    fixture.detectChanges();
  });

  it('should display the component', () => {
    expect(hostComponentNE.querySelector('sb-charts')).toEqual(jasmine.anything());
  });
});
