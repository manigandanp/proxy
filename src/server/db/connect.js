"use strict";

import logger from "../../../logger";
import { Sequelize } from "sequelize";
import c from "../../../config";
import path from "path";

const env = process.env.NODE_ENV || "development";
const config = c[env];
const DB_PATH = path.resolve(
  __dirname,
  `${config.db.path}/${config.db.fileName}`
);

const log = logger(module.filename);

class DB {
  constructor(dbPath) {
    this.db = new Sequelize({
      dialect: "sqlite",
      storage: dbPath,
      logging: (msg) => log.info(msg),
    });
    return this.db;
  }
}

const db = new DB(DB_PATH);

export { db };

// https://www.bezkoder.com/node-js-express-sequelize-mysql/
