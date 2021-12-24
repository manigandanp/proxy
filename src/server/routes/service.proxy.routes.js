import express from "express";
import logger from "../../../logger";
import { Crawler } from "../../fetcher/crawler";

const router = express.Router();
const log = logger(module.filename);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const crawler = new Crawler();

router.get("/", async (req, res) => {
  let pageUrl = req.query.url;
  log.info(`Fetching url ${pageUrl}`);
  crawler
    .crawl(pageUrl)
    .then((content) => res.json({ pageUrl: pageUrl, content: content.data }));
});

router.post("/", async (req, res) => {
  let pageUrl = req.body.url;
  let headers = req.body.headers;
  log.info(`Fetching url ${pageUrl}`);
  crawler
    .crawlWithConfig(pageUrl, headers)
    .then((content) => res.json({ pageUrl: pageUrl, content: content.data }));
});

module.exports = router;
