// this file serves to create new custom filters for the tests
// you can create custom filters by adding a new key to the customFilters object
// and then adding a function that takes in an array of TestResults and returns the filtered array

import { TestResult } from "@common/models";
import { Filter } from "@modules/settings/models";

export const customFilters: Filter[] = [
  {
    name: "All",
    active: true,
    action: (results: TestResult[]) => results,
  },
];
