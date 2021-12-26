import express from "express";
import logger from "../../../logger";
import { Crawler } from "../../fetcher/crawler";

const router = express.Router();
const log = logger(module.filename);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const crawler = new Crawler();

function responseHandler(pageUrl, requestResponse, crawlResponse) {
  return crawlResponse
    .then((content) =>
      requestResponse.json({ pageUrl: pageUrl, content: content.data })
    )
    .catch((err) =>
      requestResponse.status(400).send(`{pageUrl: ${pageUrl}, content: ${err}}`)
    );
}

router.get("/", async (req, res) => {
  let pageUrl = req.query.url;
  log.info(`Fetching url ${pageUrl}`);

  responseHandler(pageUrl, res, crawler.crawl(pageUrl));

});

router.post("/", async (req, res) => {
  let pageUrl = req.body.url;
  let crawlConfig = req.body.crawlConfig;
  log.info(`Fetching url ${pageUrl}`);

  responseHandler(pageUrl, res, crawler.crawlWithConfig(pageUrl, crawlConfig));
});

module.exports = router;
