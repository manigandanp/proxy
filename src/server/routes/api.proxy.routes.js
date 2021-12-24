import express from "express";
// import bodyParser from "body-parser";
import logger from "../../../logger";
import { fetchAndStoreProxies } from "../../fetcher/proxy-parser";
import { findAllProxies } from "../controller/proxy.contoller";
const path = require("path");
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

router.get("/refresh", async (req, res) => {
  log.info("refreshing proxies");
  await fetchAndStoreProxies()
    .then((proxies) => {
      res.json({ updated: `${proxies.length} proxies` });
    })
    .catch((err) => res.json({ err: err }));
});

// Testing enpoints -- START

// router.get("/new1", async (req, res) => {
//   log.info("creatgin new");
//   let proxies = await createProxy({
//     host: "178.128.178.169",
//     port: 3128,
//     protocol: "https",
//     country: "us",
//   });

//   res.json({ proxies: "created" });
// });

// router.get("/new2", async (req, res) => {
//   log.info("creatgin new");
//   let proxies = await bulkCreateProxy([
//     {
//       host: "testip-1",
//       port: 12,
//       country: "US",
//       protocol: "http",
//     },
//     { host: "testip-2", port: 12, country: "US", protocol: "http" },
//   ]);

//   res.json({ proxies: "created" });
// });

// Testing enpoints -- END

module.exports = router;
