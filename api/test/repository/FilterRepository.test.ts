import { beforeEach, describe, expect, it } from "vitest";
import { FilterRepository } from "../../src/repositories";

const mockFilter = {
  name: "name",
  active: true,
};

describe("FilterRepositoryTest", () => {
  let mockTestRunRepository: any;
  beforeEach(() => {
    mockTestRunRepository = {
      allNamespaces: () => ["namespace1", "namespace2"],
    };
  });

  it("should be able to create a filter", () => {
    const filterRepository = new FilterRepository();

    expect(filterRepository.size()).toBe(0);
    filterRepository.add(mockFilter);
    expect(filterRepository.size()).toBe(1);
  });
});
