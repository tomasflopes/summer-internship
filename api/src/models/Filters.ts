import { Filter } from "./Filter";

export interface Filters {
  [key: string]: Filter[];
  default: Filter[];
  selected: Filter[];
}
