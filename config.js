const config = {};

config.server = {};
config.db = {};

config.server.port = process.env.PORT || 7001;
config.db.path = process.env.DB_PATH || "../../data";
config.db.fileName = process.env.DB_FILENAME || "proxies.db";

module.exports = config;
