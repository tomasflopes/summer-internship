import { FilterRepository } from "../repositories/FilterRepository";

export class FilterController {
  constructor(private repo: FilterRepository) { }

  async index(request: Request, response: Response) {
    return response.json(this.repo.findAll());
  }

  async show(request: Request, response: Response) {
    const { name } = request.params;

    const filter = this.repo.findWithName(name);

    if (!filter) {
      return response.status(404).json({
        error: "Filter not found.",
      });
    }

    return response.json(filter);
  }


  async update(request: Request, response: Response) {
    const { name } = request.params;

    try {
      this.repo.toggleWithName(name);
    } catch (err) {
      return response.status(404).json({
        error: "Filter not found.",
      });
    }

    return response.status(204).send();
  }
}
