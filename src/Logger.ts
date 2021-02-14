import Formatter from './Formatter';
import LogProfile from './LogProfile';
import Pipeline from './Pipeline';
import LoggerProps from './Types/LoggerInterface';
import LogLevel from './Types/LogLevelEnum';
import LogProfileProps from './Types/LogProfileInterface';
import PipelineProps from './Types/PipelineInterface';

class Logger {
    public formatter = new Formatter();
    public format: string = '';
    public logLevel: LogLevel;
    public logProfiles: LogProfile[];
    public pipelines: Pipeline[];

    constructor() {}

    public enable({
        format,
        loglevel = LogLevel.INFO,
        pipelines = [],
        logProfiles = []
    }: LoggerProps): Logger {
        this.format = format;
        this.logLevel = loglevel;

        for (const pipeline of pipelines) {
            this.registerPipeline(pipeline);
        }

        for (const logProfile of logProfiles) {
            this.registerProfile(logProfile);
        }

        return this;
    }

    /**
     * Log something to your pipelines
     * @param profile the profile that you want to pipe
     * @param message the message that you want to pipe 
     */
    public log(profile: string, message: string): void {

    }

    /**
     * Register a new Log Profile
     * @param logProfile Your log profile properties 
     */
    public registerProfile(logProfile: LogProfile | LogProfileProps): void {
        this.logProfiles.push(
            logProfile instanceof LogProfile ? logProfile : new LogProfile(logProfile)
        );
    }


    /**
     * Register a new pipeline
     * @param pipeline Pipeline properties
     */
    public registerPipeline(pipeline: Pipeline | PipelineProps): void {
        this.pipelines.push(pipeline instanceof Pipeline ? pipeline : new Pipeline(pipeline))
    }
}

export default Logger;
