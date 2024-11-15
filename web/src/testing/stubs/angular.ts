// https://angular.io/guide/testing#activatedroutestub

import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject = new ReplaySubject<ParamMap>();

  constructor(initialParams: Params) {
    this.setParamMap(initialParams);
  }

  /** The mock paramMap observable */
  readonly paramMap = this.subject.asObservable();

  /** Set the paramMap observables's next value */
  setParamMap(params: Params) {
    this.subject.next(convertToParamMap(params));
  }
}

export class RouterStub {
  events = new BehaviorSubject<Event>({} as Event);
}
