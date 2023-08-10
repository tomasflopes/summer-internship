import { Filter } from "./filter.model";

export interface Filters {
  [key: string]: Filter[];
  custom: Filter[];
  predefined: Filter[];
  selected: Filter[];
}
