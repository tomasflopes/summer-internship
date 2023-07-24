import { TestBed } from '@angular/core/testing';

import { TestsGuard } from './tests.guard';

describe('Tests Guards', () => {
  let chartsGuard: TestsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [TestsGuard],
    });
    chartsGuard = TestBed.inject(TestsGuard);
  });

  describe('canActivate', () => {
    it('should return an Observable<boolean>', () => {
      chartsGuard.canActivate().subscribe(response => {
        expect(response).toEqual(true);
      });
    });
  });
});
