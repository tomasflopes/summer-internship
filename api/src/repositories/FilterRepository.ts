import { Filter } from "../models/Filter";
import { Filters } from "../models/Filters";
import { Observer } from "../models/Observer";
import { TestRunRepository } from "./TestRunRepository";

export class FilterRepository implements Observer {
  private filters: Filters;

  constructor(private testRunRepo: TestRunRepository) {
    this.filters = this.updateFilters();
  }

  findAll(): Filters {
    return this.filters;
  }

  findWithName(name: string): Filter {
    return this.filters.custom.find((filter) => filter.name === name) ||
      this.filters.predefined.find((filter) => filter.name === name) ||
      this.filters.selected.find((filter) => filter.name === name);
  }

  toggleWithName(name: string): void {
    const filter = this.findWithName(name);
    if (!filter) {
      throw new Error(`Filter with name ${name} does not exist.`);
    }

    filter.active = !filter.active;
  }

  private updateFilters() {
    if (this.filters === undefined) {
      const filters = {
        custom: [{
          name: "test",
          active: true,
        }],
        predefined: [{
          name: "passed",
          active: true,
        }, {
          name: "failed",
          active: true,
        }, {
          name: "skipped",
          active: true,
        }],
        selected: this.testRunRepo.allNamespaces().map((namespace) => ({
          name: namespace,
          active: true,
        })),
      };
      return filters;
    }

    const newSelected = this.testRunRepo.allNamespaces().map((namespace) => ({
      name: namespace,
      active: true,
    }));

    const filters = {
      custom: this.filters.custom,
      predefined: this.filters.predefined,
      selected: this.filters.selected.concat(newSelected),
    };
    return filters;
  }

  private nameExists(name: string): boolean {
    return this.filters.filter((filter) => filter.name === name).length > 0;
  }

  add(key: string, filter: Filter): void {
    if (this.nameExists(filter.name)) {
      throw new Error(`Filter with name ${filter.name} already exists.`);
    }

    this.filters[key].push(filter);
  }

  addAll(filters: Filters): void {
    filters.custom.forEach((filter) => this.add("custom", filter));
    filters.predefined.forEach((filter) => this.add("predefined", filter));
    filters.selected.forEach((filter) => this.add("selected", filter));
  }

  update(): void {
    this.filters = this.updateFilters();
  }
}
