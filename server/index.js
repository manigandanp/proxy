import config from "../config";
import express from "express";
import proxyRoutes from "./routes/proxy.routes";
import { db } from "./db/connect";
import logger from "../logger";

const log = logger(module.filename);

const PORT = config.server.port;

const app = express();

app.use("/api/proxies", proxyRoutes);

function init() {
  db.sync({ force: true });
  db.authenticate()
    .then((msg) => {
      app.listen(PORT, () => log.info(`Server is listening on port ${PORT}`));
      log.info("successfully connected to db");
    })
    .catch((err) => log.error(err));
}

init();
