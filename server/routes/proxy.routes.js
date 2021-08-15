import express from "express";
// import bodyParser from "body-parser";
import logger from "../../logger";
import { findAllProxies, createProxy } from "../controller/proxy.contoller";

const router = express.Router();
const log = logger(module.filename);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.get("/", async (req, res) => {
  log.info("sending all proxies response");
  let proxies = await findAllProxies();
  res.json(proxies);
});

module.exports = router;
