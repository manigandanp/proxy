import config from "../../config";
import express from "express";
import proxyRoutes from "./routes/api.proxy.routes";
import proxyService from "./routes/service.proxy.routes";
import { db } from "./db/connect";
import logger from "../../logger";
import { fetchAndStoreProxies } from "../fetcher/proxy-parser";
const path = require("path");

const log = logger(module.filename);
const env = process.env.NODE_ENV || "development";

const PORT = process.env.PORT || config[env].server.port;
const app = express();

app.use(express.static(path.resolve(__dirname, "../../app")));

app.use("/api/proxies", proxyRoutes);
app.use("/fetch", proxyService);

app.get("/", (req, res) => {
  res.sendFile("../../app/index.html", { root: __dirname });
});

function init() {
  db.sync({ force: true })
    .then((msg) => fetchAndStoreProxies())
    .then((msg) => {
      app.listen(PORT, () => log.info(`Server is listening on port ${PORT}`));
      log.info("successfully connected to db");
    })
    .catch((err) => log.error(err));
}

init();
