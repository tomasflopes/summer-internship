import { TestResult } from "./TestResult";

export interface TestRun {
  name: string;
  testResults: Omit<TestResult, "runName">[];
  times: {
    creation: Date;
    start: Date;
    finish: Date;
    duration: string;
  };
  counters: {
    total: number;
    executed: number;
    passed: number;
    failed: number;
    error: number;
    timeout: number;
    aborted: number;
    inconclusive: number;
    passedButRunAborted: number;
    notRunnable: number;
    notExecuted: number;
    disconnected: number;
    warning: number;
    completed: number;
    inProgress: number;
    pending: number;
  };
  createdAt: Date;
}
