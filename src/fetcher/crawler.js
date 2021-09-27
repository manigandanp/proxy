import axios from "axios";
import logger from "../../logger";
import config from "../../config";
import { Helper } from "./utils/helper";

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
      timeout: 50000,
      headers: { "User-Agent": userAgent },
    };
    this.__log.info(
      `Fetching ${url} with proxy config = ${
        proxy ? proxy["host"] : proxy
      } and userAgent = ${userAgent} `
    );

    return axios.get(url, crawlConfig);
  }
  // Crawl using proxy implemention - implementaion is fine but proxies are not working
  // async crawl(url) {
  //   return await findAllProxies().then((pr) => {
  //     let proxies = pr.map((p) => p.toJSON());
  //     let proxy = this.__helper.getRandomFromArr(proxies);
  //     return this.__crawlWithProxy(url, proxy);
  //   });
  // }
  crawl(url) {
    let proxy;
    return this.__crawlWithProxy(url, proxy);
  }
}
