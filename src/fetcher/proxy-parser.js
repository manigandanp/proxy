import cheerio from "cheerio";
import { bulkCreateProxy } from "../server/controller/proxy.contoller";
import { Helper } from "./utils/helper";
import { Crawler } from "./crawler";

/**
 * https://hidemy.name/en/proxy-list/?type=s&anon=34#list
 *
 */

let urls = [
  "https://free-proxy-list.net/",
  "https://proxylist.geonode.com/api/proxy-list?limit=100&page=1&sort_by=lastChecked&sort_type=desc&protocols=https",
];

let crawler = new Crawler();
let helper = new Helper();

export async function fetchAndStoreProxies() {
  return await Promise.all(
    urls.map(async (url) => await parserProxies(url))
  ).then((proxiesList) => bulkCreateProxy([].concat(...proxiesList)));
}

async function parserProxies(url) {
  if (url.includes("proxylist.geonode.com")) {
    return await crawler
      .crawl(url)
      .then((content) => parseProxiesFromGeoNode(content));
  } else if (url.includes("free-proxy-list.net")) {
    return await crawler
      .crawl(url)
      .then((content) => parseProxiesFromFreeProxyList(content));
  }
}

function parseProxiesFromGeoNode(content) {
  let proxiesJson = content.data.data;
  return proxiesJson.map(function (proxyObj) {
    let host = proxyObj.ip;
    let port = proxyObj.port;

    return {
      hash: helper.hash(`${host}:${port}`),
      host: host,
      port: port,
      protocol: proxyObj.protocols[0],
      country: proxyObj.country,
    };
  });
}

function parseProxiesFromFreeProxyList(content) {
  let $ = cheerio.load(content.data);
  let proxies = $("table.table-striped tbody tr")
    .map(function (i, e) {
      let columns = $("td", e)
        .map((j, el) => $(el).text().trim())
        .get();
      let host = columns[0];
      let port = columns[1];
      let protocol = columns["6"] == "yes" ? "https" : "http";
      let country = columns["2"];

      return {
        hash: helper.hash(`${host}:${port}`),
        host: host,
        port: port,
        protocol: protocol,
        country: country,
      };
    })
    .get();
  return proxies;
}
