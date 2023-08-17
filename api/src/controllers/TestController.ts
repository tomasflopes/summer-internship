import { Request, Response } from "express";

import { TestRunRepository } from "../repositories";

export class TestController {
  constructor(private repo: TestRunRepository) {}

  async show(request: Request, response: Response) {
    const { name, className } = request.query;

    const tests = this.repo.findTestResults(name, className);

    if (!tests) {
      return response.status(404).json({ error: "Test not found" });
    }

    return response.json(tests);
  }
}
