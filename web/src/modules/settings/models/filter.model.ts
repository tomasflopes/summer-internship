import { TestResult } from "@common/models";

export interface Filter {
  name: string;
  active: boolean;
  description?: string;
  action?: (results: TestResult[]) => TestResult[];
}
