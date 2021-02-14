import Logger from "../src/Logger"

const logger = new Logger({
  format: string;
  loglevel?: number;
  pipelines?: PipelineProps[];
  logProfiles?: LogProfileProps[];
});
