import { Router } from "express";

import { TestRunController } from "./controllers/TestRunController";
import { TestController } from "./controllers/TestController";

import { TestRunRepository } from "./repositories/TestRunRepository";
import { FilterRepository } from "./repositories/FilterRepository";

import multer from "multer";
import { multerConfig } from "./config/multer";
import { FilterController } from "./controllers/FilterController";

// for now this approach is fine, but if we have more than one repository
// we should use a dependency injection container
const runRepository = new TestRunRepository();
const filterRepository = new FilterRepository(runRepository);
runRepository.subscribe(filterRepository);

const runController = new TestRunController(runRepository);
const testController = new TestController(runRepository);
const filterController = new FilterController(filterRepository);

const routes = Router();

routes.get(
  "/runs",
  (request, response) => runController.index(request, response),
);
routes.get(
  "/runs/:id",
  (request, response) => runController.show(request, response),
);
routes.post(
  "/runs",
  multer(multerConfig).single("file"),
  (request, response) => runController.store(request, response),
);

routes.get("/namespaces", (request, response) => {
  runController.allNamespaces(request, response);
});

routes.get("/filters", (request, response) => {
  filterController.index(request, response);
});
routes.get("/filters/:name", (request, response) => {
  filterController.show(request, response);
});
routes.patch("/filters/:name", (request, response) => {
  filterController.update(request, response);
});

routes.get(
  "/tests",
  (request, response) => testController.show(request, response),
);

export default routes;
