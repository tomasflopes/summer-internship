"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRunRepository = void 0;
class TestRunRepository {
    constructor() {
        this.testRuns = [];
    }
    findAll() {
        return this.testRuns;
    }
    findWithClass(id, className) {
        if (!this.testRuns[id])
            return undefined;
        return this.testRuns[id].testResults.filter((result) => result.className === className);
    }
    add(testRun) {
        this.testRuns.push(testRun);
    }
    addAll(testRuns) {
        this.testRuns = this.testRuns.concat(testRuns);
    }
    findWithId(runId) {
        return this.testRuns[runId];
    }
}
exports.TestRunRepository = TestRunRepository;
