export interface TestResult {
  [key: string]: string | number | undefined;
  id: string;
  name: string;
  outcome: 'Passed' | 'Failed' | 'Skipped';
  duration: string;
  startTime: string;
  endTime: string;
  testType: string;
  description: string;
  className: string;
  output?: string;
  nOfOccurances: number;
}
