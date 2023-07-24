import { Request, Response } from "express";

import { TrxParser } from '../services/TrxParser';
import { TestRunRepository } from "../repositories/TestRunRepository";
import { TestRun } from "../models/TestRun";

export class TestRunController {
  constructor(private repo: TestRunRepository) { }

  async index(request: Request, response: Response) {
    return response.json(this.repo.findAll());
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const { className } = request.query;

    if (!this.repo.findWithId(id))
      return response.status(404).json({ error: 'Test run not found' });

    if (className) {
      if (!this.repo.findWithClass(id, className))
        return response.status(404).json({ error: 'Test class not found' });
      else
        return response.json(this.repo.findWithClass(id, className));
    }

    return response.json(this.repo.findWithId(id));
  }

  async store(request: Request, response: Response) {
    const { path } = request.file;

    try {
      const trxParser = new TrxParser();
      const content = trxParser.parseFile(path);

      this.repo.add(content);
      return response.json(content);
    } catch (e) {
      console.log(e);
      return response.status(400).json({ error: e.message });
    }
  }
}

