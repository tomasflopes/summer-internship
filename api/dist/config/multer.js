"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
require('dotenv').config();
const storage = multer_1.default.diskStorage({
    destination: (_, __, callback) => {
        callback(null, path_1.default.resolve(__dirname, '..', '..', 'temp'));
    },
    filename: (_, file, callback) => {
        crypto_1.default.randomBytes(2, (error, hash) => {
            if (error)
                callback(error);
            const date = new Date().toJSON().slice(0, 10);
            const fileName = `${date}-${hash.toString('hex')}-${file.originalname}`;
            callback(null, fileName);
        });
    },
});
exports.multerConfig = {
    dest: path_1.default.resolve(__dirname, '..', '..', 'temp', 'uploads'),
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
    FileFilter: (_, file, callback) => {
        const allowedMimes = ['application/xml', 'text/xml', 'text/trx'];
        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        }
        else {
            callback(new Error('Invalid file type.'));
        }
    },
};
