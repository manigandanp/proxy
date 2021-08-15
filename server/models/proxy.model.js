import { DataTypes, Model } from "sequelize";
import { db as sequelize } from "../db/connect";

export class Proxy extends Model {}

Proxy.init(
  {
    ip: DataTypes.STRING,
    port: DataTypes.INTEGER,
    country: DataTypes.STRING,
    protocol: DataTypes.STRING,
  },
  { sequelize, modelName: "Proxy" }
);

// https://www.bezkoder.com/node-js-express-sequelize-mysql/
