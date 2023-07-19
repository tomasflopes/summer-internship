"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const TrxParser_1 = require("../services/TrxParser");
class TestController {
    constructor(repo) {
        this.repo = repo;
    }
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return response.json(this.repo.findAll());
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { path } = request.file;
            try {
                const trxParser = new TrxParser_1.TrxParser();
                const content = trxParser.parseFile(path);
                this.repo.addAll(content);
                return response.json(content);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.TestController = TestController;
