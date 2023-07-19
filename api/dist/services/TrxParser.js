"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrxParser = void 0;
const fast_xml_parser_1 = require("fast-xml-parser");
class TrxParser {
    parse(xml) {
        const options = {
            attributeNamePrefix: '@',
            ignoreAttributes: false,
            ignoreNameSpace: false,
            allowBooleanAttributes: true,
            parseNodeValue: true,
            parseAttributeValue: true,
            trimValues: true,
            parseTrueNumberOnly: false,
            arrayMode: false,
            attrValueProcessor: (val) => val.trim(),
        };
        const parser = new fast_xml_parser_1.XMLParser(options);
        const content = parser.parse(xml);
        const testDefinitions = content.TestRun.TestDefinitions.UnitTest;
        const testResults = content.TestRun.Results.UnitTestResult.map((testRun) => {
            const testData = testDefinitions.find((testDefinition) => testDefinition['@id'] === testRun['@testId']);
            return {
                id: testRun['@testId'],
                name: testRun['@testName'],
                outcome: testRun['@outcome'],
                duration: testRun['@duration'],
                startTime: testRun['@startTime'],
                endTime: testRun['@endTime'],
                testType: testRun['@testType'],
                description: testData['Description'],
                className: testData.TestMethod['@className'],
            };
        });
        return {
            testResults,
            counters: {
                total: content.TestRun.ResultSummary.Counters['@total'],
                executed: content.TestRun.ResultSummary.Counters['@executed'],
                passed: content.TestRun.ResultSummary.Counters['@passed'],
                failed: content.TestRun.ResultSummary.Counters['@failed'],
                error: content.TestRun.ResultSummary.Counters['@error'],
                timeout: content.TestRun.ResultSummary.Counters['@timeout'],
                aborted: content.TestRun.ResultSummary.Counters['@aborted'],
                inconclusive: content.TestRun.ResultSummary.Counters['@inconclusive'],
                passedButRunAborted: content.TestRun.ResultSummary.Counters['@passedButRunAborted'],
                notRunnable: content.TestRun.ResultSummary.Counters['@notRunnable'],
                notExecuted: content.TestRun.ResultSummary.Counters['@notExecuted'],
                disconnected: content.TestRun.ResultSummary.Counters['@disconnected'],
                warning: content.TestRun.ResultSummary.Counters['@warning'],
                completed: content.TestRun.ResultSummary.Counters['@completed'],
                inProgress: content.TestRun.ResultSummary.Counters['@inProgress'],
                pending: content.TestRun.ResultSummary.Counters['@pending'],
            }
        };
    }
    ;
    parseFile(filePath) {
        const fs = require('fs');
        const xml = fs.readFileSync(filePath, 'utf8');
        if (!xml)
            throw new Error('File not found');
        return this.parse(xml);
    }
}
exports.TrxParser = TrxParser;
