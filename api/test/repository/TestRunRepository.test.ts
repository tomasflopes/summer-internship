import { describe, expect, it } from "vitest";
import { TestRunRepository } from "../../src/repositories/TestRunRepository";

const mockTestRun = {
  name: "name",
  testResults: [
    {
      id: "id1",
      name: "name1",
      outcome: "Passed",
      duration: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      description: "description",
      className: "base.Class.Name.Concrete1",
      output: null,
    },
    {
      id: "id2",
      name: "name2",
      outcome: "Passed",
      duration: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      description: "description",
      className: "base.Class.Name2.Concrete2",
      output: null,
    },
  ],
  times: {
    creation: new Date(),
    start: new Date(),
    finish: new Date(),
    duration: "duraiton",
  },
  counters: {
    total: 10,
    executed: 10,
    passed: 0,
    failed: 0,
    error: 0,
    timeout: 0,
    aborted: 0,
    inconclusive: 0,
    passedButRunAborted: 0,
    notRunnable: 0,
    notExecuted: 0,
    disconnected: 0,
    warning: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
  },
  createdAt: new Date(),
};

describe("TestRunRepositoryTest", () => {
  it("should be able to create a test run", () => {
    const testRunRepository = new TestRunRepository();

    expect(testRunRepository.size()).toBe(0);
    testRunRepository.add(mockTestRun);
    expect(testRunRepository.size()).toBe(1);
  });

  it("should be able to add multiple test runs", () => {
    const testRunRepository = new TestRunRepository();

    expect(testRunRepository.size()).toBe(0);
    testRunRepository.addAll([mockTestRun, mockTestRun]);
    expect(testRunRepository.size()).toBe(2);
  });

  it("should be able to find a test run by id", () => {
    const testRunRepository = new TestRunRepository();
    testRunRepository.add(mockTestRun);

    expect(testRunRepository.findWithId("0")).toBe(mockTestRun);
  });

  it("should be able to list all namespaces", () => {
    const testRunRepository = new TestRunRepository();
    testRunRepository.add(mockTestRun);

    expect(testRunRepository.allNamespaces()).toEqual([
      "base.Class",
      "base.Class.Name",
      "base.Class.Name2",
    ]);
  });
});
