export interface TestResult {
  id: string;
  name: string;
  runName: string;
  outcome: string;
  duration: Date;
  startTime: Date;
  endTime: Date;
  description: string;
  className: string;
  output: string | null;
}
