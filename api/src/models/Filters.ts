import { Filter } from "./Filter";

export interface Filters {
  [key: string]: Filter[];
  custom: Filter[];
  predefined: Filter[];
  selected: Filter[];
}
