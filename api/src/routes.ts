import { Router } from 'express';

import { TestRunController } from './controllers/TestRunController';
import { TestRunRepository } from './repositories/TestRunRepository';
import multer from 'multer';
import { multerConfig } from './config/multer';

const ctrl = new TestRunController(new TestRunRepository());

const routes = Router();

routes.get('/tests', (request, response) => ctrl.index(request, response));
routes.get('/tests/:id', (request, response) => ctrl.show(request, response));
routes.post('/tests', multer(multerConfig).single('file'), (request, response) => ctrl.store(request, response));

export default routes;
