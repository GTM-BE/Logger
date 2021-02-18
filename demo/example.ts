import Logger from "../src/Logger"
import LogProfile from "../src/LogProfile";
import LogLevel from "../src/Types/LogLevelEnum";

const logger = new Logger().enable({
  loglevel: LogLevel.INFO,
  logProfiles: [new LogProfile({name: "test", prefix: "test", logLevel: LogLevel.INFO })],
})

logger.log("test", "EIne test nachricht für den logger");
