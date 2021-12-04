import { Formatter } from './Formatter';
import { Pipeline } from './Pipelines/Pipeline';
import { ConsolePipeline } from './Pipelines/ConsolePipeline';
import { FilePipeline } from './Pipelines/FilePipeline';
import { Colors } from './Types/Colors';
import { LogProfile } from './Types/LogProfile';

interface LoggerProps {
  format?: string;
  logLevel: number;
  pipelines?: Pipeline[];
  logProfiles?: LogProfile[];
  defaultPipelines?: boolean;
  defaultColors?: boolean;
}
class Logger {
  public formatter: Formatter;
  public logLevel: number;
  public logProfiles: Map<string, LogProfile> = new Map();
  public pipelines: Map<string, Pipeline> = new Map();

  constructor({
    format,
    logLevel,
    pipelines = [],
    logProfiles = [],
    defaultPipelines = true,
    defaultColors = true
  }: LoggerProps) {
    this.formatter = new Formatter(format);
    this.logLevel = logLevel;

    for (const pipeline of pipelines) {
      this.registerPipeline(pipeline);
    }

    if (defaultPipelines) {
      this.registerPipeline(new FilePipeline('logger'));
      this.registerPipeline(new ConsolePipeline());
    }

    for (const logProfile of logProfiles) {
      this.registerProfile(logProfile);
    }

    if (defaultColors) {
      this.formatter.registerColor(Colors.BLACK, 0);
      this.formatter.registerColor(Colors.DARK_RED, 1);
      this.formatter.registerColor(Colors.DARK_GREEN, 2);
      this.formatter.registerColor(Colors.GOLD, 3);
      this.formatter.registerColor(Colors.DARK_BLUE, 4);
      this.formatter.registerColor(Colors.VIOLET, 5);
      this.formatter.registerColor(Colors.CYAN, 6);
      this.formatter.registerColor(Colors.GREY, 7);
      this.formatter.registerColor(Colors.DARK_GREY, 8);
      this.formatter.registerColor(Colors.RED, 9);
      this.formatter.registerColor(Colors.GREEN, 10);
      this.formatter.registerColor(Colors.YELLOW, 11);
      this.formatter.registerColor(Colors.BLUE, 12);
      this.formatter.registerColor(Colors.PINK, 13);
      this.formatter.registerColor(Colors.LIGHT_BLUE, 14);
      this.formatter.registerColor(Colors.WHITE, 15);
    }
    return this;
  }

  /**
   * Log something to your pipelines
   * @param profile the profile that you want to pipe
   * @param message the message that you want to pipe
   * @returns boolean
   */
  public log(profile: string, message: string): boolean {
    const logProfile = this.logProfiles.get(profile);
    if (logProfile) {
      for (const [, value] of this.pipelines) {
        const formattedMessage = this.formatter?.format(message, logProfile, value) ?? '';
        value.pipe(formattedMessage, logProfile, this.logLevel);
      }
      return true;
    }
    return false;
  }

  /**
   * Register a new Log Profile
   * @param logProfile Your log profile properties
   */
  public registerProfile(logProfile: LogProfile): void {
    this.logProfiles.set(logProfile.name, logProfile);
  }

  /**
   * Register a new pipeline
   * @param pipeline Pipeline properties
   */
  public registerPipeline(pipeline: Pipeline): void {
    this.pipelines.set(pipeline.name, pipeline);
  }
}

export { Logger };
