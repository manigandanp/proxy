import express from "express";
// import bodyParser from "body-parser";
import logger from "../../../logger";
import {
  findAllProxies,
  createProxy,
  bulkCreateProxy,
} from "../controller/proxy.contoller";
import { Proxy } from "../models/proxy.model";

const router = express.Router();
const log = logger(module.filename);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.get("/", async (req, res) => {
  log.info("sending all proxies as response");
  let proxies = await findAllProxies();
  res.json(proxies);
});

// Testing enpoints -- START

router.get("/new1", async (req, res) => {
  log.info("creatgin new");
  let proxies = await createProxy({
    host: "178.128.178.169",
    port: 3128,
    protocol: "https",
    country: "us",
  });

  res.json({ proxies: "created" });
});

router.get("/new2", async (req, res) => {
  log.info("creatgin new");
  let proxies = await bulkCreateProxy([
    {
      host: "testip-1",
      port: 12,
      country: "US",
      protocol: "http",
    },
    { host: "testip-2", port: 12, country: "US", protocol: "http" },
  ]);

  res.json({ proxies: "created" });
});

// Testing enpoints -- END

module.exports = router;
