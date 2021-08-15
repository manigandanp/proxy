const common = {
  server: {
    port: 7001,
  },
};

module.exports = {
  production: {
    ...common,
    db: {
      path: "../../data",
      fileName: "proxies.db",
    },
  },
  development: {
    ...common,
    db: {
      path: "../../data",
      fileName: "proxies_dev.db",
    },
  },
};

// module.exports = config;
