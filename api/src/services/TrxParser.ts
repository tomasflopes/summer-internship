import { XMLParser } from "fast-xml-parser";
import { TestRun } from "../models/TestRun";

export class TrxParser {
  parse(xml: string, createdAt: Date): TestRun {
    const options = {
      attributeNamePrefix: "@",
      ignoreAttributes: false,
      ignoreNameSpace: false,
      allowBooleanAttributes: true,
      parseNodeValue: true,
      parseAttributeValue: true,
      trimValues: true,
      parseTrueNumberOnly: false,
      arrayMode: false,
      attrValueProcessor: (val: string) => val.trim(),
    };

    const parser = new XMLParser(options);
    const content = parser.parse(xml);

    if (
      !content.TestRun || !content.TestRun.TestDefinitions ||
      !content.TestRun.Results || !content.TestRun.Results.UnitTestResult ||
      !content.TestRun.ResultSummary ||
      !content.TestRun.ResultSummary.Counters || !content.TestRun.Times
    ) {
      throw new Error("Invalid file structure");
    }

    const testDefinitionsData = content.TestRun.TestDefinitions.UnitTest;
    const testDefinitions = testDefinitionsData.length === undefined
      ? [testDefinitionsData]
      : testDefinitionsData;
    const unitTestResultsData = content.TestRun.Results.UnitTestResult;
    const unitTestResults = unitTestResultsData.length === undefined
      ? [unitTestResultsData]
      : unitTestResultsData;

    const testResults = unitTestResults.map((testRun: any) => {
      const testData = testDefinitions.find((testDefinition: any) =>
        testDefinition["@id"] === testRun["@testId"]
      );

      if (!testData) {
        throw new Error("The test is not defined");
      }

      return {
        id: testRun["@testId"],
        name: testRun["@testName"],
        outcome: testRun["@outcome"],
        duration: testRun["@duration"],
        startTime: testRun["@startTime"],
        endTime: testRun["@endTime"],
        testType: testRun["@testType"],
        description: testData["Description"],
        className: testData.TestMethod["@className"],
      };
    });

    return {
      testResults,
      counters: {
        total: content.TestRun.ResultSummary.Counters["@total"],
        executed: content.TestRun.ResultSummary.Counters["@executed"],
        passed: content.TestRun.ResultSummary.Counters["@passed"],
        failed: content.TestRun.ResultSummary.Counters["@failed"],
        error: content.TestRun.ResultSummary.Counters["@error"],
        timeout: content.TestRun.ResultSummary.Counters["@timeout"],
        aborted: content.TestRun.ResultSummary.Counters["@aborted"],
        inconclusive: content.TestRun.ResultSummary.Counters["@inconclusive"],
        passedButRunAborted:
          content.TestRun.ResultSummary.Counters["@passedButRunAborted"],
        notRunnable: content.TestRun.ResultSummary.Counters["@notRunnable"],
        notExecuted: content.TestRun.ResultSummary.Counters["@notExecuted"],
        disconnected: content.TestRun.ResultSummary.Counters["@disconnected"],
        warning: content.TestRun.ResultSummary.Counters["@warning"],
        completed: content.TestRun.ResultSummary.Counters["@completed"],
        inProgress: content.TestRun.ResultSummary.Counters["@inProgress"],
        pending: content.TestRun.ResultSummary.Counters["@pending"],
      },
      times: {
        creation: content.TestRun.Times["@creation"],
        start: content.TestRun.Times["@start"],
        finish: content.TestRun.Times["@finish"],
        duration: this.getDuration(
          content.TestRun.Times["@start"],
          content.TestRun.Times["@finish"],
        ),
      },
      createdAt,
    };
  }

  private getDuration(start: string, finish: string): string {
    const startDate = new Date(start);
    const finishDate = new Date(finish);

    const diffInSeconds = (finishDate.getTime() - startDate.getTime()) / 1000;

    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds - (hours * 3600)) / 60);
    const seconds = Math.floor(diffInSeconds - (hours * 3600) - (minutes * 60));

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(n: number) {
    return n < 10 ? `0${n}` : n;
  }

  parseFile(filePath: string): TestRun {
    const fs = require("fs");
    const xml = fs.readFileSync(filePath, "utf8");

    if (!xml) {
      throw new Error("File not found");
    }

    return this.parse(xml);
  }
}
