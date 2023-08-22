// this file serves to create new custom filters for the tests
// you can create custom filters by adding a new key to the customFilters object
// and then adding a function that takes in an array of TestResults and returns the filtered array

import { TestResult } from "@common/models";
import { Filter } from "@modules/settings/models";

export const customFilters: Filter[] = [
  {
    name: "All",
    active: true,
    action: (results) => results,
  },
  {
    name: "With output",
    active: true,
    action: (results) => results.filter((result) => result.output),
    description: "Lists all the tests that have an output."
  },
  {
    name: "Without output",
    active: true,
    action: (results) => results.filter((result) => !result.output),
    description: "Lists all the tests that do not have an output."
  },
  {
    name: "Passed with short output",
    active: true,
    action: (results) => results.filter((result) => result.outcome === 'Passed' && result.output && result.output.length < 100),
    description: "Lists all the tests that have a short output (less than 100 characters)."
  }
];
