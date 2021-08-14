"use strict";

import logger from "../../logger";
import { Sequelize } from "sequelize";
import Proxy from "../models/proxy.model";

const log = logger(module.filename);

export class DB {
  //Add singleton instance
  constructor(dbPath) {
    this.db = new Sequelize({
      dialect: "sqlite",
      storage: dbPath,
      logging: (msg) => log.info(msg),
    });

    this.proxyModel = Proxy(this.db);
    return { db: this.db, proxyModel: this.proxyModel };
  }
}

// https://www.bezkoder.com/node-js-express-sequelize-mysql/
