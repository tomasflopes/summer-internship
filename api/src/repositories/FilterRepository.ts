import { TestRunRepository } from "../repositories";
import { Filter, Filters, Observer } from "../models";

export class FilterRepository implements Observer {
  private filters: Filters;

  constructor(private testRunRepo: TestRunRepository) {
    this.filters = this.updateFilters();
  }

  findAll(): Filters {
    return this.filters;
  }

  findWithName(name: string): Filter {
    return this.filters.default.find((filter: Filter) =>
      filter.name === name
    ) ||
      this.filters.selected.find((filter: Filter) => filter.name === name);
  }

  changeWithName(name: string, value: boolean) {
    const filter = this.findWithName(name);

    if (!filter) {
      throw new Error("Filter not found");
    }

    filter.active = value;
  }

  private updateFilters() {
    if (this.filters === undefined) {
      const filters = {
        default: [{
          name: "passed",
          active: true,
        }, {
          name: "failed",
          active: true,
        }, {
          name: "skipped",
          active: true,
        }],
        selected: this.testRunRepo.allNamespaces().map((namespace: string) => ({
          name: namespace,
          active: true,
        })),
      };
      return filters;
    }

    const newSelected = this.testRunRepo.allNamespaces().map((
      namespace: string,
    ) => ({
      name: namespace,
      active: true,
    }));

    const filters = {
      default: this.filters.default,
      selected: this.filters.selected.concat(newSelected),
    };
    return filters;
  }

  private nameExists(name: string): boolean {
    return this.filters.filter((filter: Filter) => filter.name === name)
      .length > 0;
  }

  add(key: string, filter: Filter): void {
    if (this.nameExists(filter.name)) {
      throw new Error(`Filter with name ${filter.name} already exists.`);
    }

    this.filters[key].push(filter);
  }

  addAll(filters: Filters): void {
    filters.default.forEach((filter: Filter) => this.add("default", filter));
    filters.selected.forEach((filter: Filter) => this.add("selected", filter));
  }

  update(): void {
    this.filters = this.updateFilters();
  }

  size(): number {
    return this.filters.default.length + this.filters.selected.length;
  }
}
