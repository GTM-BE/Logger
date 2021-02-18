import Formatter from './Formatter';
import LogProfile from './LogProfile';
import Pipeline from './Pipeline';
import ConsolePipeline from './Pipelines/ConsolePipeline';
import FilePipeline from './Pipelines/FilePipeline';
import LoggerProps from './Types/LoggerInterface';
import LogLevel from './Types/LogLevelEnum';
import LogProfileProps from './Types/LogProfileInterface';
import PipelineProps from './Types/PipelineInterface';

class Logger {
    public formatter: Formatter;
    public logLevel: LogLevel;
    public logProfiles: Map<string, LogProfile> = new Map();
    public pipelines: Map<string, Pipeline> = new Map();

    constructor() {}

    public enable({
        format,
        loglevel = LogLevel.INFO,
        pipelines = [],
        logProfiles = [],
        defaultPipelines = true,
        defaultProfiles = true,
        defaultColors = true
    }: LoggerProps): Logger {
        this.formatter = new Formatter(format);
        this.logLevel = loglevel;

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

        if (defaultProfiles) {
            this.registerProfile({
                name: 'info',
                prefix: 'IFNO',
                logLevel: LogLevel.INFO
            });
            this.registerProfile({
                name: 'warn',
                prefix: 'WARN',
                logLevel: LogLevel.INFO
            });
            this.registerProfile({
                name: 'error',
                prefix: 'ERROR',
                logLevel: LogLevel.INFO
            });
            this.registerProfile({
                name: 'debug',
                prefix: 'DEBUG',
                logLevel: LogLevel.DEBUG
            });
        }

        if (defaultColors) {
            // Do something later :D
        }
        return this;
    }

    /**
     * Log something to your pipelines
     * @param profile the profile that you want to pipe
     * @param message the message that you want to pipe
     */
    public log(profile: string, message: string): void {
        if (this.logProfiles.has(profile)) {
            const logProfile = this.logProfiles.get(profile);
            for (const [key, value] of this.pipelines) {
                message = this.formatter.format(message, logProfile, value);
                value.pipe(message, logProfile, this.logLevel);
            }
        }
    }

    /**
     * Register a new Log Profile
     * @param logProfile Your log profile properties
     */
    public registerProfile(logProfile: LogProfile | LogProfileProps): void {
        this.logProfiles.set(
            logProfile.name,
            logProfile instanceof LogProfile ? logProfile : new LogProfile(logProfile)
        );
    }

    /**
     * Register a new pipeline
     * @param pipeline Pipeline properties
     */
    public registerPipeline(pipeline: Pipeline | PipelineProps): void {
        this.pipelines.set(
            pipeline.name,
            pipeline instanceof Pipeline ? pipeline : new Pipeline(pipeline)
        );
    }
}

export default Logger;
