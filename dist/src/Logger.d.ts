import Formatter from './Formatter';
import LogProfile from './LogProfile';
import LoggerProps from './Types/LoggerInterface';
import LogLevel from './Types/LogLevelEnum';
import LogProfileProps from './Types/LogProfileInterface';
import PipelineProps from './Types/PipelineProps';
declare class Logger {
    formatter: Formatter | undefined;
    logLevel: LogLevel;
    logProfiles: Map<string, LogProfile>;
    pipelines: Map<string, PipelineProps>;
    enable({ format, loglevel, pipelines, logProfiles, defaultPipelines, defaultProfiles, defaultColors }: LoggerProps): Logger;
    /**
     * Log something to your pipelines
     * @param profile the profile that you want to pipe
     * @param message the message that you want to pipe
     * @returns boolean
     */
    log(profile: string, message: string): boolean;
    /**
     * Register a new Log Profile
     * @param logProfile Your log profile properties
     */
    registerProfile(logProfile: LogProfile | LogProfileProps): void;
    /**
     * Register a new pipeline
     * @param pipeline Pipeline properties
     */
    registerPipeline(pipeline: PipelineProps): void;
}
export default Logger;
//# sourceMappingURL=Logger.d.ts.map