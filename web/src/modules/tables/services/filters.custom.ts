// this file serves to create new custom filters for the tests
// you can create custom filters by adding a new key to the customFilters object
// and then adding a function that takes in an array of TestResults and returns the filtered array

import { TestResult } from "@common/models";

export const customFilters: {
  [key: string]: (results: TestResult[]) => TestResult[]
} = {
  all: (results: TestResult[]) => results,
  // E.g. passed: (results: TestResult[]) => results.filter(result => result.outcome === 'Passed'),
}
