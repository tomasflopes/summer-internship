import { TestRun } from '../models/TestRun';

export class TestRunRepository {
  private testRuns: TestRun[];

  constructor() {
    this.testRuns = [];
  }

  findAll(): TestRun[] {
    return this.testRuns;
  }

  findWithClass(id: string, className: string): TestRun[] | undefined {
    if (!this.testRuns[id])
      return undefined;
    return this.testRuns[id].testResults.filter((result) => result.className === className);
  }

  add(testRun: TestRun): void {
    this.testRuns.push(testRun);
  }

  addAll(testRuns: TestRun[]): void {
    this.testRuns = this.testRuns.concat(testRuns);
  }

  findWithId(runId: string): TestRun | undefined {
    return this.testRuns[runId];
  }
}

