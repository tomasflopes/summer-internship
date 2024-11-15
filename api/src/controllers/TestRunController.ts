import { Request, Response } from "express";

import { TestRunRepository } from "../repositories";
import { TrxParser } from "../services/TrxParser";

export class TestRunController {
  constructor(private repo: TestRunRepository) {}

  async index(request: Request, response: Response) {
    return response.json(this.repo.findAll());
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const { className } = request.query as { className: string };

    if (!this.repo.findWithId(id)) {
      return response.status(404).json({ error: "Test run not found" });
    }

    if (className) {
      if (!this.repo.findWithClass(id, className)) {
        return response.status(404).json({ error: "Test class not found" });
      } else {
        return response.json(this.repo.findWithClass(id, className));
      }
    }

    return response.json(this.repo.findWithId(id));
  }

  async store(request: Request, response: Response) {
    const { path } = request.file as Express.Multer.File;

    try {
      const trxParser = new TrxParser();
      const content = trxParser.parseFile(path);

      const name = `Test Run ${this.repo.size() + 1}`;

      const testRun = {
        name,
        ...content,
      };

      return response.json(this.repo.add(testRun));
    } catch (e) {
      return response.status(400).json({ error: e.message });
    }
  }

  async allNamespaces(request: Request, response: Response) {
    return response.json(this.repo.allNamespaces());
  }
}
