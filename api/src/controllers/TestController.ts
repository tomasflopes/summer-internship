import { Request, Response } from "express";

import { TestRunRepository } from "../repositories/TestRunRepository";

export class TestController {
  constructor(private repo: TestRunRepository) { }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if (!this.repo.findTestResults(id)) {
      return response.status(404).json({ error: "Test not found" });
    }

    return response.json(this.repo.findTestResults(id));
  }
}
