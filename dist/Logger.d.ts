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
    log(profile: string, message: string): boolean;
    registerProfile(logProfile: LogProfile | LogProfileProps): void;
    registerPipeline(pipeline: PipelineProps): void;
}
export default Logger;
