import { DecimalPipe, LowerCasePipe } from '@angular/common';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NgBootstrapTableComponent } from './test-table.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  template: `
        <test-table
            [someInput]="someInput"
            (someFunction)="someFunction($event)"
        ></test-table>
    `,
})
class TestHostComponent {
  // someInput = 1;
  // someFunction(event: Event) {}
}

describe('NgBootstrapTableComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let hostComponentDE: DebugElement;
  let hostComponentNE: Element;

  let component: NgBootstrapTableComponent;
  let componentDE: DebugElement;
  let componentNE: Element;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, NgBootstrapTableComponent],
      imports: [NoopAnimationsModule, HttpClientModule],
      providers: [LowerCasePipe],
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
    expect(hostComponentNE.querySelector('test-table')).toEqual(jasmine.anything());
  });
});
