import { expect, describe, it } from 'vitest';
import { TrxParser } from '../../src/services/TrxParser';

describe('TrxParser', () => {
  it('should parse trx structure with multiple tests', async () => {
    const trx = `
      <TestRun id="2c9c0c7a-9a0b-4a9d-9ba1-0d8a2d0c9f4e" name="test" runUser="DESKTOP-1" xmlns="http://microsoft.com/schemas/VisualStudio/TeamTest/2010">
        <Times creation="2023-06-21T10:49:20.1894813+01:00" queuing="2023-06-21T10:49:20.1894813+01:00" start="2023-06-21T10:48:54.0738344+01:00" finish="2023-06-21T12:23:10.5068209+01:00" />
        <Results>
          <UnitTestResult executionId="3aa8e763-1298-42ac-9503-bbe3b3cb8787" testId="321" testName="T01_Test" computerName="SampleComputer" duration="00:00:11.8375326" startTime="2023-06-21T11:31:20.9626294+01:00" endTime="2023-06-21T11:31:32.8001048+01:00" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Passed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="3aa8e763-1298-42ac-9503-bbe3b3cb8787">
            <Output>
              <StdOut>Daemon Logs:
                2023-06-21T11:31:30,257+0100 WEST [140648228183168] INFO  PERSO.Configuration - Log configurations loaded from: ./Resources/log4cpp.properties
                2023-06-21T11:31:30,258+0100 WEST [140648228183168] INFO  PERSO.Configuration - Instance Name is set to: TestDaemon_A017
                2023-06-21T11:31:30,380+0100 WEST [140648228183168] FATAL PERSO.Main - Daemon exiting.</StdOut>
            </Output>
          </UnitTestResult>
          <UnitTestResult executionId="0f7d3700-f32a-4728-98a2-c41a4eb140b3" testId="123" testName="T02_Test2" computerName="SampleComputer" duration="00:00:12.7948246" startTime="2023-06-21T11:03:33.5080335+01:00" endTime="2023-06-21T11:03:46.2996825+01:00" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Passed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="0f7d3700-f32a-4728-98a2-c41a4eb140b3">
            <Output>
              <StdOut>Daemon Logs:
                2023-06-21T11:03:34,947+0100 WEST [140266646064256] INFO  PERSO.Configuration - Log configurations loaded from: ./Resources/log4cpp.properties
                2023-06-21T11:03:34,947+0100 WEST [140266646064256] INFO  PERSO.Configuration - Instance Name is set to: testdaemon470300
              </StdOut>
            </Output>
          </UnitTestResult>
        </Results>
        <TestDefinitions>
          <UnitTest name="T01_Test" storage="sampleStorage" id="123">
            <Execution id="13fe0ac6-5484-45e8-8a44-ca3ebb8cf874" />
            <TestMethod codeBase="sampleCodeBase" adapterTypeName="sampleAdapter" className="Sample.ClassName" name="T01_Test" />
            <Description>Test Description</Description>
          </UnitTest>
          <UnitTest name="T02_Test2" storage="sampleStorage" id="321">
            <Execution id="ad882f0b-055d-4b8a-9df9-7c7f8810a878" />
            <TestMethod codeBase="sampleCodeBase" adapterTypeName="sampleAdapter" className="Sample.ClassName" name="T02_Test2" />
            <Description>Test Description</Description>
          </UnitTest>
        </TestDefinitions>
        <ResultSummary outcome="Completed">
          <Counters total="469" executed="465" passed="465" failed="0" error="0" timeout="0" aborted="0" inconclusive="0" passedButRunAborted="0" notRunnable="0" notExecuted="0" disconnected="0" warning="0" completed="0" inProgress="0" pending="0" />
          <Output>
            <StdOut>Test 'T01_WithValidEmailAddress' was skipped in the test run.
              Test 'T02_WithInvalidEmailAddress' was skipped in the test run.
              Test 'T03_WithNullEmailAddress' was skipped in the test run.
              Test 'T01_ValidateVersionConsistency' was skipped in the test run.
            </StdOut>
          </Output>
        </ResultSummary>
      </TestRun>
    `;

    const exptected = {
      counters: {
        aborted: 0,
        completed: 0,
        disconnected: 0,
        error: 0,
        executed: 465,
        failed: 0,
        inProgress: 0,
        inconclusive: 0,
        notExecuted: 0,
        notRunnable: 0,
        passed: 465,
        passedButRunAborted: 0,
        pending: 0,
        timeout: 0,
        total: 469,
        warning: 0,
      },
      testResults: [
        {
          className: "Sample.ClassName",
          description: "Test Description",
          duration: "00:00:11.8375326",
          endTime: "2023-06-21T11:31:32.8001048+01:00",
          id: 321,
          name: "T01_Test",
          outcome: "Passed",
          startTime: "2023-06-21T11:31:20.9626294+01:00",
          testType: "13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b",
        },
        {
          className: "Sample.ClassName",
          description: "Test Description",
          duration: "00:00:12.7948246",
          endTime: "2023-06-21T11:03:46.2996825+01:00",
          id: 123,
          name: "T02_Test2",
          outcome: "Passed",
          startTime: "2023-06-21T11:03:33.5080335+01:00",
          testType: "13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b",
        }
      ],
      times: {
        creation: "2023-06-21T10:49:20.1894813+01:00",
        duration: "01:34:16",
        finish: "2023-06-21T12:23:10.5068209+01:00",
        start: "2023-06-21T10:48:54.0738344+01:00",
      },
    };

    const parser = new TrxParser();
    const result = parser.parse(trx);

    expect(result).toEqual(exptected);
  });

  it('should parse a trx file with a single test', () => {
    const trx = `
      <TestRun id="2c9c0c7a-9a0b-4a9d-9ba1-0d8a2d0c9f4e" name="test" runUser="DESKTOP-1" xmlns="http://microsoft.com/schemas/VisualStudio/TeamTest/2010">
        <Times creation="2023-06-21T10:49:20.1894813+01:00" queuing="2023-06-21T10:49:20.1894813+01:00" start="2023-06-21T10:48:54.0738344+01:00" finish="2023-06-21T12:23:10.5068209+01:00" />
        <Results>
          <UnitTestResult executionId="3aa8e763-1298-42ac-9503-bbe3b3cb8787" testId="321" testName="T01_Test" computerName="SampleComputer" duration="00:00:11.8375326" startTime="2023-06-21T11:31:20.9626294+01:00" endTime="2023-06-21T11:31:32.8001048+01:00" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Passed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="3aa8e763-1298-42ac-9503-bbe3b3cb8787">
            <Output>
              <StdOut>Daemon Logs:
                2023-06-21T11:31:30,257+0100 WEST [140648228183168] INFO  PERSO.Configuration - Log configurations loaded from: ./Resources/log4cpp.properties
                2023-06-21T11:31:30,258+0100 WEST [140648228183168] INFO  PERSO.Configuration - Instance Name is set to: TestDaemon_A017
                2023-06-21T11:31:30,380+0100 WEST [140648228183168] FATAL PERSO.Main - Daemon exiting.</StdOut>
            </Output>
          </UnitTestResult>
        </Results>
        <TestDefinitions>
          <UnitTest name="T02_Test2" storage="sampleStorage" id="321">
            <Execution id="ad882f0b-055d-4b8a-9df9-7c7f8810a878" />
            <TestMethod codeBase="sampleCodeBase" adapterTypeName="sampleAdapter" className="Sample.ClassName" name="T02_Test2" />
            <Description>Test Description</Description>
          </UnitTest>
        </TestDefinitions>
        <ResultSummary outcome="Completed">
          <Counters total="469" executed="465" passed="465" failed="0" error="0" timeout="0" aborted="0" inconclusive="0" passedButRunAborted="0" notRunnable="0" notExecuted="0" disconnected="0" warning="0" completed="0" inProgress="0" pending="0" />
          <Output>
            <StdOut>Test 'T01_WithValidEmailAddress' was skipped in the test run.
              Test 'T02_WithInvalidEmailAddress' was skipped in the test run.
              Test 'T03_WithNullEmailAddress' was skipped in the test run.
              Test 'T01_ValidateVersionConsistency' was skipped in the test run.
            </StdOut>
          </Output>
        </ResultSummary>
      </TestRun>
    `;

    const exptected = {
      counters: {
        aborted: 0,
        completed: 0,
        disconnected: 0,
        error: 0,
        executed: 465,
        failed: 0,
        inProgress: 0,
        inconclusive: 0,
        notExecuted: 0,
        notRunnable: 0,
        passed: 465,
        passedButRunAborted: 0,
        pending: 0,
        timeout: 0,
        total: 469,
        warning: 0,
      },
      testResults: [
        {
          className: "Sample.ClassName",
          description: "Test Description",
          duration: "00:00:11.8375326",
          endTime: "2023-06-21T11:31:32.8001048+01:00",
          id: 321,
          name: "T01_Test",
          outcome: "Passed",
          startTime: "2023-06-21T11:31:20.9626294+01:00",
          testType: "13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b",
        }],
      times: {
        creation: "2023-06-21T10:49:20.1894813+01:00",
        duration: "01:34:16",
        finish: "2023-06-21T12:23:10.5068209+01:00",
        start: "2023-06-21T10:48:54.0738344+01:00",
      },
    };

    const parser = new TrxParser();
    const result = parser.parse(trx);

    expect(result).toEqual(exptected);
  });

  it('should give an error when there are no results ', () => {
    const trx = `
      <TestRun id="2c9c0c7a-9a0b-4a9d-9ba1-0d8a2d0c9f4e" name="test" runUser="DESKTOP-1" xmlns="http://microsoft.com/schemas/VisualStudio/TeamTest/2010">
        <Times creation="2023-06-21T10:49:20.1894813+01:00" queuing="2023-06-21T10:49:20.1894813+01:00" start="2023-06-21T10:48:54.0738344+01:00" finish="2023-06-21T12:23:10.5068209+01:00" />
        <TestDefinitions>
          <UnitTest name="T02_Test2" storage="sampleStorage" id="321">
            <Execution id="ad882f0b-055d-4b8a-9df9-7c7f8810a878" />
            <TestMethod codeBase="sampleCodeBase" adapterTypeName="sampleAdapter" className="Sample.ClassName" name="T02_Test2" />
            <Description>Test Description</Description>
          </UnitTest>
        </TestDefinitions>
        <ResultSummary outcome="Completed">
          <Counters total="469" executed="465" passed="465" failed="0" error="0" timeout="0" aborted="0" inconclusive="0" passedButRunAborted="0" notRunnable="0" notExecuted="0" disconnected="0" warning="0" completed="0" inProgress="0" pending="0" />
          <Output>
            <StdOut>Test 'T01_WithValidEmailAddress' was skipped in the test run.
              Test 'T02_WithInvalidEmailAddress' was skipped in the test run.
              Test 'T03_WithNullEmailAddress' was skipped in the test run.
              Test 'T01_ValidateVersionConsistency' was skipped in the test run.
            </StdOut>
          </Output>
        </ResultSummary>
      </TestRun>
    `;


    const parser = new TrxParser();
    expect(() => parser.parse(trx)).toThrowError('Invalid file structure');
  });

  it('should give an error when there are no test definitions ', () => {
    const trx = `
      <TestRun id="2c9c0c7a-9a0b-4a9d-9ba1-0d8a2d0c9f4e" name="test" runUser="DESKTOP-1" xmlns="http://microsoft.com/schemas/VisualStudio/TeamTest/2010">
        <Times creation="2023-06-21T10:49:20.1894813+01:00" queuing="2023-06-21T10:49:20.1894813+01:00" start="2023-06-21T10:48:54.0738344+01:00" finish="2023-06-21T12:23:10.5068209+01:00" />
        <Results>
          <UnitTestResult executionId="3aa8e763-1298-42ac-9503-bbe3b3cb8787" testId="321" testName="T01_Test" computerName="SampleComputer" duration="00:00:11.8375326" startTime="2023-06-21T11:31:20.9626294+01:00" endTime="2023-06-21T11:31:32.8001048+01:00" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Passed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="3aa8e763-1298-42ac-9503-bbe3b3cb8787">
            <Output>
              <StdOut>Daemon Logs:
                2023-06-21T11:31:30,257+0100 WEST [140648228183168] INFO  PERSO.Configuration - Log configurations loaded from: ./Resources/log4cpp.properties
                2023-06-21T11:31:30,258+0100 WEST [140648228183168] INFO  PERSO.Configuration - Instance Name is set to: TestDaemon_A017
                2023-06-21T11:31:30,380+0100 WEST [140648228183168] FATAL PERSO.Main - Daemon exiting.</StdOut>
            </Output>
          </UnitTestResult>
        </Results>
        <ResultSummary outcome="Completed">
          <Counters total="469" executed="465" passed="465" failed="0" error="0" timeout="0" aborted="0" inconclusive="0" passedButRunAborted="0" notRunnable="0" notExecuted="0" disconnected="0" warning="0" completed="0" inProgress="0" pending="0" />
          <Output>
            <StdOut>Test 'T01_WithValidEmailAddress' was skipped in the test run.
              Test 'T02_WithInvalidEmailAddress' was skipped in the test run.
              Test 'T03_WithNullEmailAddress' was skipped in the test run.
              Test 'T01_ValidateVersionConsistency' was skipped in the test run.
            </StdOut>
          </Output>
        </ResultSummary>
      </TestRun>
    `;

    const parser = new TrxParser();
    expect(() => parser.parse(trx)).toThrowError('Invalid file structure');
  });

  it('should give an error when there is no result summary ', () => {
    const trx = `
      <TestRun id="2c9c0c7a-9a0b-4a9d-9ba1-0d8a2d0c9f4e" name="test" runUser="DESKTOP-1" xmlns="http://microsoft.com/schemas/VisualStudio/TeamTest/2010">
        <Times creation="2023-06-21T10:49:20.1894813+01:00" queuing="2023-06-21T10:49:20.1894813+01:00" start="2023-06-21T10:48:54.0738344+01:00" finish="2023-06-21T12:23:10.5068209+01:00" />
        <Results>
          <UnitTestResult executionId="3aa8e763-1298-42ac-9503-bbe3b3cb8787" testId="321" testName="T01_Test" computerName="SampleComputer" duration="00:00:11.8375326" startTime="2023-06-21T11:31:20.9626294+01:00" endTime="2023-06-21T11:31:32.8001048+01:00" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Passed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="3aa8e763-1298-42ac-9503-bbe3b3cb8787">
            <Output>
              <StdOut>Daemon Logs:
                2023-06-21T11:31:30,257+0100 WEST [140648228183168] INFO  PERSO.Configuration - Log configurations loaded from: ./Resources/log4cpp.properties
                2023-06-21T11:31:30,258+0100 WEST [140648228183168] INFO  PERSO.Configuration - Instance Name is set to: TestDaemon_A017
                2023-06-21T11:31:30,380+0100 WEST [140648228183168] FATAL PERSO.Main - Daemon exiting.</StdOut>
            </Output>
          </UnitTestResult>
        </Results>
        <TestDefinitions>
          <UnitTest name="T02_Test2" storage="sampleStorage" id="321">
            <Execution id="ad882f0b-055d-4b8a-9df9-7c7f8810a878" />
            <TestMethod codeBase="sampleCodeBase" adapterTypeName="sampleAdapter" className="Sample.ClassName" name="T02_Test2" />
            <Description>Test Description</Description>
          </UnitTest>
        </TestDefinitions>
      </TestRun>
    `;

    const parser = new TrxParser();
    expect(() => parser.parse(trx)).toThrowError('Invalid file structure');
  });

  it('should give an error when there are no counters ', () => {
    const trx = `
      <TestRun id="2c9c0c7a-9a0b-4a9d-9ba1-0d8a2d0c9f4e" name="test" runUser="DESKTOP-1" xmlns="http://microsoft.com/schemas/VisualStudio/TeamTest/2010">
        <Times creation="2023-06-21T10:49:20.1894813+01:00" queuing="2023-06-21T10:49:20.1894813+01:00" start="2023-06-21T10:48:54.0738344+01:00" finish="2023-06-21T12:23:10.5068209+01:00" />
        <Results>
          <UnitTestResult executionId="3aa8e763-1298-42ac-9503-bbe3b3cb8787" testId="321" testName="T01_Test" computerName="SampleComputer" duration="00:00:11.8375326" startTime="2023-06-21T11:31:20.9626294+01:00" endTime="2023-06-21T11:31:32.8001048+01:00" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Passed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="3aa8e763-1298-42ac-9503-bbe3b3cb8787">
            <Output>
              <StdOut>Daemon Logs:
                2023-06-21T11:31:30,257+0100 WEST [140648228183168] INFO  PERSO.Configuration - Log configurations loaded from: ./Resources/log4cpp.properties
                2023-06-21T11:31:30,258+0100 WEST [140648228183168] INFO  PERSO.Configuration - Instance Name is set to: TestDaemon_A017
                2023-06-21T11:31:30,380+0100 WEST [140648228183168] FATAL PERSO.Main - Daemon exiting.</StdOut>
            </Output>
          </UnitTestResult>
        </Results>
        <TestDefinitions>
          <UnitTest name="T02_Test2" storage="sampleStorage" id="321">
            <Execution id="ad882f0b-055d-4b8a-9df9-7c7f8810a878" />
            <TestMethod codeBase="sampleCodeBase" adapterTypeName="sampleAdapter" className="Sample.ClassName" name="T02_Test2" />
            <Description>Test Description</Description>
          </UnitTest>
        </TestDefinitions>
        <ResultSummary outcome="Completed">
          <Output>
            <StdOut>Test 'T01_WithValidEmailAddress' was skipped in the test run.
              Test 'T02_WithInvalidEmailAddress' was skipped in the test run.
              Test 'T03_WithNullEmailAddress' was skipped in the test run.
              Test 'T01_ValidateVersionConsistency' was skipped in the test run.
            </StdOut>
          </Output>
        </ResultSummary>
      </TestRun>
    `;

    const parser = new TrxParser();
    expect(() => parser.parse(trx)).toThrowError('Invalid file structure');
  });

  it('should throw an error when the test is not defined', () => {
    const trx = `
      <TestRun id="2c9c0c7a-9a0b-4a9d-9ba1-0d8a2d0c9f4e" name="test" runUser="DESKTOP-1" xmlns="http://microsoft.com/schemas/VisualStudio/TeamTest/2010">
        <Times creation="2023-06-21T10:49:20.1894813+01:00" queuing="2023-06-21T10:49:20.1894813+01:00" start="2023-06-21T10:48:54.0738344+01:00" finish="2023-06-21T12:23:10.5068209+01:00" />
        <Results>
          <UnitTestResult executionId="3aa8e763-1298-42ac-9503-bbe3b3cb8787" testId="321" testName="T01_Test" computerName="SampleComputer" duration="00:00:11.8375326" startTime="2023-06-21T11:31:20.9626294+01:00" endTime="2023-06-21T11:31:32.8001048+01:00" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Passed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="3aa8e763-1298-42ac-9503-bbe3b3cb8787">
            <Output>
              <StdOut>Daemon Logs:
                2023-06-21T11:31:30,257+0100 WEST [140648228183168] INFO  PERSO.Configuration - Log configurations loaded from: ./Resources/log4cpp.properties
                2023-06-21T11:31:30,258+0100 WEST [140648228183168] INFO  PERSO.Configuration - Instance Name is set to: TestDaemon_A017
                2023-06-21T11:31:30,380+0100 WEST [140648228183168] FATAL PERSO.Main - Daemon exiting.</StdOut>
            </Output>
          </UnitTestResult>
        </Results>
        <TestDefinitions>
          <UnitTest name="T03_Test3" storage="sampleStorage" id="123">
            <Execution id="ad882f0b-055d-4b8a-9df9-7c7f8810a878" />
            <TestMethod codeBase="sampleCodeBase" adapterTypeName="sampleAdapter" className="Sample.ClassName" name="T02_Test2" />
            <Description>Test Description</Description>
          </UnitTest>
        </TestDefinitions>
        <ResultSummary outcome="Completed">
          <Counters total="469" executed="465" passed="465" failed="0" error="0" timeout="0" aborted="0" inconclusive="0" passedButRunAborted="0" notRunnable="0" notExecuted="0" disconnected="0" warning="0" completed="0" inProgress="0" pending="0" />
          <Output>
            <StdOut>Test 'T01_WithValidEmailAddress' was skipped in the test run.
              Test 'T02_WithInvalidEmailAddress' was skipped in the test run.
              Test 'T03_WithNullEmailAddress' was skipped in the test run.
              Test 'T01_ValidateVersionConsistency' was skipped in the test run.
            </StdOut>
          </Output>
        </ResultSummary>
      </TestRun>
    `;

    const parser = new TrxParser();
    expect(() => parser.parse(trx)).toThrowError('The test is not defined');
  });

  it('should throw an error when times is not defined', () => {
    const trx = `
      <TestRun id="2c9c0c7a-9a0b-4a9d-9ba1-0d8a2d0c9f4e" name="test" runUser="DESKTOP-1" xmlns="http://microsoft.com/schemas/VisualStudio/TeamTest/2010">
        <Results>
          <UnitTestResult executionId="3aa8e763-1298-42ac-9503-bbe3b3cb8787" testId="321" testName="T01_Test" computerName="SampleComputer" duration="00:00:11.8375326" startTime="2023-06-21T11:31:20.9626294+01:00" endTime="2023-06-21T11:31:32.8001048+01:00" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Passed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="3aa8e763-1298-42ac-9503-bbe3b3cb8787">
            <Output>
              <StdOut>Daemon Logs:
                2023-06-21T11:31:30,257+0100 WEST [140648228183168] INFO  PERSO.Configuration - Log configurations loaded from: ./Resources/log4cpp.properties
                2023-06-21T11:31:30,258+0100 WEST [140648228183168] INFO  PERSO.Configuration - Instance Name is set to: TestDaemon_A017
                2023-06-21T11:31:30,380+0100 WEST [140648228183168] FATAL PERSO.Main - Daemon exiting.</StdOut>
            </Output>
          </UnitTestResult>
        </Results>
        <TestDefinitions>
          <UnitTest name="T02_Test2" storage="sampleStorage" id="321">
            <Execution id="ad882f0b-055d-4b8a-9df9-7c7f8810a878" />
            <TestMethod codeBase="sampleCodeBase" adapterTypeName="sampleAdapter" className="Sample.ClassName" name="T02_Test2" />
            <Description>Test Description</Description>
          </UnitTest>
        </TestDefinitions>
        <ResultSummary outcome="Completed">
          <Counters total="469" executed="465" passed="465" failed="0" error="0" timeout="0" aborted="0" inconclusive="0" passedButRunAborted="0" notRunnable="0" notExecuted="0" disconnected="0" warning="0" completed="0" inProgress="0" pending="0" />
          <Output>
            <StdOut>Test 'T01_WithValidEmailAddress' was skipped in the test run.
              Test 'T02_WithInvalidEmailAddress' was skipped in the test run.
              Test 'T03_WithNullEmailAddress' was skipped in the test run.
              Test 'T01_ValidateVersionConsistency' was skipped in the test run.
            </StdOut>
          </Output>
        </ResultSummary>
      </TestRun>
    `;

    const parser = new TrxParser();
    expect(() => parser.parse(trx)).toThrowError('Invalid file structure');
  });

  it('should trim the values of the fields', () => {
    const trx = `
      <TestRun id="2c9c0c7a-9a0b-4a9d-9ba1-0d8a2d0c9f4e" name="  test   " runUser="DESKTOP-1" xmlns="http://microsoft.com/schemas/VisualStudio/TeamTest/2010">
        <Times creation="2023-06-21T10:49:20.1894813+01:00" queuing="2023-06-21T10:49:20.1894813+01:00" start="2023-06-21T10:48:54.0738344+01:00" finish="2023-06-21T12:23:10.5068209+01:00" />
        <Results>
          <UnitTestResult executionId="3aa8e763-1298-42ac-9503-bbe3b3cb8787" testId="321" testName="  T01_Test " computerName="SampleComputer" duration="00:00:11.8375326" startTime="2023-06-21T11:31:20.9626294+01:00" endTime="2023-06-21T11:31:32.8001048+01:00" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Passed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="3aa8e763-1298-42ac-9503-bbe3b3cb8787">
            <Output>
              <StdOut>Daemon Logs:
                2023-06-21T11:31:30,257+0100 WEST [140648228183168] INFO  PERSO.Configuration - Log configurations loaded from: ./Resources/log4cpp.properties
                2023-06-21T11:31:30,258+0100 WEST [140648228183168] INFO  PERSO.Configuration - Instance Name is set to: TestDaemon_A017
                2023-06-21T11:31:30,380+0100 WEST [140648228183168] FATAL PERSO.Main - Daemon exiting.</StdOut>
            </Output>
          </UnitTestResult>
        </Results>
        <TestDefinitions>
          <UnitTest name=" T02_Test2" storage="sampleStorage" id="321 ">
            <Execution id="ad882f0b-055d-4b8a-9df9-7c7f8810a878" />
            <TestMethod codeBase="sampleCodeBase" adapterTypeName="sampleAdapter" className="Sample.ClassName" name="T02_Test2" />
            <Description>Test Description         </Description>
          </UnitTest>
        </TestDefinitions>
        <ResultSummary outcome="Completed">
          <Counters total="469" executed="465" passed="465" failed="0" error="0" timeout="0" aborted="0" inconclusive="0" passedButRunAborted="0" notRunnable="0" notExecuted="0" disconnected="0" warning="0" completed="0" inProgress="0" pending="0" />
          <Output>
          </Output>
        </ResultSummary>
      </TestRun>
    `;

    const parser = new TrxParser();
    const result = parser.parse(trx);

    const exptected = {
      counters: {
        aborted: 0,
        completed: 0,
        disconnected: 0,
        error: 0,
        executed: 465,
        failed: 0,
        inProgress: 0,
        inconclusive: 0,
        notExecuted: 0,
        notRunnable: 0,
        passed: 465,
        passedButRunAborted: 0,
        pending: 0,
        timeout: 0,
        total: 469,
        warning: 0,
      },
      testResults: [
        {
          className: "Sample.ClassName",
          description: "Test Description",
          duration: "00:00:11.8375326",
          endTime: "2023-06-21T11:31:32.8001048+01:00",
          id: 321,
          name: "T01_Test",
          outcome: "Passed",
          startTime: "2023-06-21T11:31:20.9626294+01:00",
          testType: "13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b",
        }],
      times: {
        creation: "2023-06-21T10:49:20.1894813+01:00",
        duration: "01:34:16",
        finish: "2023-06-21T12:23:10.5068209+01:00",
        start: "2023-06-21T10:48:54.0738344+01:00",
      },
    };

    expect(result).toEqual(exptected);
  });


});

