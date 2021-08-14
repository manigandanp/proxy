import express from "express";
import logger from "../../logger";

const router = express.Router();
const log = logger(module.filename);

const response = {};

router.get("/", (req, res) => {
  log.info("sending response");
  res.json(response);
});

module.exports = router;
