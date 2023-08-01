export interface TestResult {
  [key: string]: string | undefined;
  id: string;
  name: string;
  outcome: string;
  duration: string;
  startTime: string;
  endTime: string;
  testType: string;
  description: string;
  className: string;
  output?: string;
}
