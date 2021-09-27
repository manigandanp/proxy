import { Proxy } from "../models/proxy.model";
import { db as sequelize } from "../db/connect";

const { QueryTypes } = require("sequelize");

const createProxy = (proxyObj) => Proxy.create(proxyObj);

const bulkCreateProxy = async (proxyObjArr) =>
  await deleteOldAndCreateNew().then((msg) => Proxy.bulkCreate(proxyObjArr), {
    ignoreDuplicates: true,
    updateOnDuplicate: ["createdAt", "updatedAt"],
  });

const findAllProxies = async () => {
  return await deleteOldAndCreateNew().then((msg) =>
    Proxy.findAll({
      attributes: [
        "id",
        "host",
        "port",
        "country",
        "protocol",
        "createdAt",
        "hash",
      ],
    })
  );
};

const deleteOldAndCreateNew = async () => {
  return await sequelize.query(
    "DELETE FROM `proxies` WHERE id IN (SELECT id  FROM `proxies` ORDER BY createdAt desc LIMIT -1 offset 1000)",
    {
      type: QueryTypes.DELETE,
      model: Proxy,
    }
  );
};

export { createProxy, findAllProxies, bulkCreateProxy };
