import { Proxy } from "../models/proxy.model";

const createProxy = async (proxyObj) => await Proxy.create(proxyObj);

const bulkCreateProxy = async (proxyObjArr) =>
  await Proxy.bulkCreate(proxyObjArr);

const findAllProxies = async (proxyObj) =>
  await Proxy.findAll({ attributes: ["ip", "port", "country", "protocol"] });

export { createProxy, findAllProxies, bulkCreateProxy };
