import axios from "axios";
import logger from "../../logger";
import config from "../../config";
import { findAllProxies } from "../server/controller/proxy.contoller";

class Helper {
  getRandomFromArr(items) {
    return items[Math.floor(Math.random() * items.length)];
  }
}

export class Crawler {
  constructor() {
    this.__helper = new Helper();
    this.__log = logger(module.filename);
    this.__proxies = [];
  }

  __crawlWithProxy(url, proxy) {
    let userAgent = this.__helper.getRandomFromArr(config["userAgents"]);
    let crawlConfig = {
      proxy: proxy,
      timeout: 10000,
      headers: { "User-Agent": userAgent },
    };
    this.__log.info(
      `Fetching ${url} with proxy config = ${proxy} and userAgent = ${userAgent} `
    );

    return axios.get(url, crawlConfig);
  }

  async crawl(url) {
    let proxies = await findAllProxies().then((pr) =>
      pr.map((p) => p.getDataValue())
    );
    let proxy = this.__helper.getRandomFromArr(proxies);

    return this.__crawlWithProxy(url, proxy);
  }
}

