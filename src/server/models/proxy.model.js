import { DataTypes, Model } from "sequelize";
import { db as sequelize } from "../db/connect";

export class Proxy extends Model {}

Proxy.init(
  {
    host: DataTypes.STRING,
    port: DataTypes.INTEGER,
    country: DataTypes.STRING,
    protocol: DataTypes.STRING,
    hash: DataTypes.STRING,
  },
  { sequelize, modelName: "Proxy" }
);

// https://www.bezkoder.com/node-js-express-sequelize-mysql/
