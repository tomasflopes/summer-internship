"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TestController_1 = require("./controllers/TestController");
const TestRunRepository_1 = require("./repositories/TestRunRepository");
const multer_1 = __importDefault(require("multer"));
const multer_2 = require("./config/multer");
const ctrl = new TestController_1.TestController(new TestRunRepository_1.TestRunRepository());
const routes = (0, express_1.Router)();
routes.get('/tests', (request, response) => ctrl.index(request, response));
routes.get('/tests/:id', (request, response) => ctrl.show(request, response));
routes.post('/tests', (0, multer_1.default)(multer_2.multerConfig).single('file'), (request, response) => ctrl.store(request, response));
exports.default = routes;
