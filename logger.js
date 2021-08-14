const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const getTransports = (filename) => {
  if (process.env.NODE_ENV !== "production") {
    return [
      new transports.Console({
        // format: format.simple(),
        format: combine(label({ label: filename }), timestamp(), logFormat),
      }),
    ];
  } else {
    //
    // - Write to all logs with level `info` and below to `proxies-combined.log`
    // - Write all logs error (and below) to `proxies-error.log`.
    //
    return [
      new transports.File({ filename: "proxies-error.log", level: "error" }),
      new transports.File({ filename: "proxies-combined.log" }),
    ];
  }
};

const getFileName = (scriptPath) => scriptPath.split("/").slice(-1);

const logger = (scriptPath) => {
  const filename = getFileName(scriptPath);
  return createLogger({
    level: "info",
    format: combine(label({ label: filename }), timestamp(), logFormat),
    transports: getTransports(filename),
  });
};

module.exports = logger;

//https://github.com/winstonjs/winston
//https://www.papertrail.com/solution/tips/node-js-logging-how-to-get-started/
//https://stackoverflow.com/questions/53655740/how-to-pass-a-filename-to-winston-logger
