import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const Proxy = sequelize.define("proxies", {
    ip: DataTypes.STRING,
    port: DataTypes.INTEGER,
  });
  return Proxy;
};

// Tried with Class implemention it was not working.
// Class Proxy extends Model{}
// https://www.bezkoder.com/node-js-express-sequelize-mysql/
