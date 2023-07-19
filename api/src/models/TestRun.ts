
export interface TestRun {
  testResults: {
    id: string;
    name: string;
    outcome: string;
    duration: Date;
    startTime: Date;
    endTime: Date;
    description: string;
    className: string;
  },
  times: {
    creation: Date;
    start: Date;
    finish: Date;
    duration: string;
  },
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
  }
}

