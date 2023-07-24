import multer from "multer";
import path from "path";
import crypto from "crypto";
require("dotenv").config();

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, path.resolve(__dirname, "..", "..", "temp"));
  },

  filename: (_, file, callback) => {
    crypto.randomBytes(2, (error, hash) => {
      if (error) callback(error);

      const date = new Date().toJSON().slice(0, 10);

      const fileName = `${date}-${hash.toString("hex")}-${file.originalname}`;

      callback(null, fileName);
    });
  },
});

export const multerConfig = {
  dest: path.resolve(__dirname, "..", "..", "temp", "uploads"),
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  FileFilter: (_, file, callback) => {
    const allowedMimes = ["application/xml", "text/xml", "text/trx"];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type."));
    }
  },
};
