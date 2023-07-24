import { TestResult } from "./result.model";

export interface TestRun {
  testResults: TestResult[],
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
  },
  times: {
    creation: string;
    start: string;
    finish: string;
    duration: string;
  },
  createdAt: string;
};
