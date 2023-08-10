import { Observable } from "../models/Observable";
import { TestResult } from "../models/TestResult";
import { TestRun } from "../models/TestRun";

export class TestRunRepository implements Observable {
  private testRuns: TestRun[];
  private observers: Observer[];

  constructor() {
    this.testRuns = [];
    this.observers = [];
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
        testResults.push({
          runName: testRun.name,
          ...testResult,
        });
      }
    }

    if (testResults.length === 0) {
      return undefined;
    }

    return testResults;
  }

  add(testRun: TestRun): TestRun {
    this.testRuns.push(testRun);
    this.notify();
    return testRun;
  }

  addAll(testRuns: TestRun[]): void {
    this.testRuns = this.testRuns.concat(testRuns);
    this.notify();
  }

  findWithId(runId: string): TestRun | undefined {
    return this.testRuns[runId];
  }

  allNamespaces(): string[] {
    const namespaces = new Set<string>();

    for (const testRun of this.testRuns) {
      for (const testResult of testRun.testResults) {
        const namespaceClasses = testResult.className.split(".");
        for (let i = 1; i < namespaceClasses.length - 1; i++) {
          namespaces.add(namespaceClasses.slice(0, i + 1).join("."));
        }
      }
    }

    return [...namespaces];
  }

  size(): number {
    return this.testRuns.length;
  }

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(): void {
    this.observers.forEach((observer) => observer.update());
  }
}
