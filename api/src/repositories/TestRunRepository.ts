import { TestResult } from "../models/TestResult";
import { TestRun } from "../models/TestRun";

export class TestRunRepository {
  private testRuns: TestRun[];

  constructor() {
    this.testRuns = [];
  }

  findAll(): TestRun[] {
    return this.testRuns;
  }

  findWithClass(id: string, className: string): TestRun[] | undefined {
    if (!this.testRuns[id]) {
      return undefined;
    }
    return this.testRuns[id].testResults.filter((result) =>
      result.className === className
    );
  }

  findTestResults(
    testName: string,
    className: string,
  ): TestResult[] | undefined {
    const testResults = [];

    for (const testRun of this.testRuns) {
      const testResult = testRun.testResults.find(
        (result: TestResult) =>
          result.name === testName && result.className === className,
      );

      if (testResult) {
        testResults.push(testResult);
      }
    }

    if (testResults.length === 0) {
      return undefined;
    }

    return testResults;
  }

  add(testRun: TestRun): TestRun {
    this.testRuns.push(testRun);
    return testRun;
  }

  addAll(testRuns: TestRun[]): void {
    this.testRuns = this.testRuns.concat(testRuns);
  }

  findWithId(runId: string): TestRun | undefined {
    return this.testRuns[runId];
  }

  size(): number {
    return this.testRuns.length;
  }
}
