import cheerio from "cheerio";
import { bulkCreateProxy } from "../server/controller/proxy.contoller";

import { Crawler } from "./crawler";

let url =
  "https://proxylist.geonode.com/api/proxy-list?limit=100&page=1&sort_by=lastChecked&sort_type=desc&protocols=https";

let crawler = new Crawler();

export async function fetchAndStoreProxies() {
  return await crawler
    .crawl(url)
    .then((content) => {
      let proxiesJson = content.data.data;
      return proxiesJson.map(function (proxyObj) {
        return {
          host: proxyObj.ip,
          port: proxyObj.port,
          protocol: proxyObj.protocols[0],
          country: proxyObj.country,
        };
      });
    })
    .then((proxies) => bulkCreateProxy(proxies));
}
