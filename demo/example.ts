import Logger from "../src/Logger"
import LogLevel from "../src/Types/LogLevelEnum";

const logger = new Logger({
  format: "|",
  loglevel: LogLevel.INFO,
  pipelines: [],
  logProfiles: [],
});
