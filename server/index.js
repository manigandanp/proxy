import config from "../config";
import express from "express";
import proxyRoutes from "./routes/proxy.routes";
import { DB } from "./db/connect";
import logger from "../logger";
import path from "path";
// import { Proxy } from "./models/proxy";

const log = logger(module.filename);

const PORT = config.server.port;

const DB_PATH = path.resolve(
  __dirname,
  `${config.db.path}/${config.db.fileName}`
);

const app = express();

app.use("/api/proxies", proxyRoutes);

function init() {
  const { db, proxyModel } = new DB(DB_PATH);
  db.sync({ force: true });
  // Proxy();
  db.authenticate()
    .then((msg) => {
      app.listen(PORT, () => log.info(`Server is listening on port ${PORT}`));
      log.info("successfully connected to db");
    })
    .catch((err) => log.error(err));
}

init();
