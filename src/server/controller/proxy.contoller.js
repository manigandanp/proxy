import { Proxy } from "../models/proxy.model";

const createProxy = (proxyObj) =>  Proxy.create(proxyObj);

const bulkCreateProxy = async (proxyObjArr) =>
  await Proxy.bulkCreate(proxyObjArr);

const findAllProxies = async () =>
  await Proxy.findAll({ attributes: ["host", "port", "country", "protocol"] });

export { createProxy, findAllProxies, bulkCreateProxy };
