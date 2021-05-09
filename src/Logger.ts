import Formatter from './Formatter';
import LogProfile from './LogProfile';
import Pipeline from './Pipeline';
import ConsolePipeline from './Pipelines/ConsolePipeline';
import FilePipeline from './Pipelines/FilePipeline';
import ColorEnum from './Types/ColorEnum';
import LoggerProps from './Types/LoggerInterface';
import LogLevel from './Types/LogLevelEnum';
import LogProfileProps from './Types/LogProfileInterface';
import PipelineProps from './Types/PipelineProps';

class Logger {
    public formatter: Formatter | undefined;
    public logLevel: LogLevel = LogLevel.INFO;
    public logProfiles: Map<string, LogProfile> = new Map();
    public pipelines: Map<string, PipelineProps> = new Map();

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
                prefix: `${ColorEnum.GREEN}INFO${ColorEnum.WHITE}`,
                logLevel: LogLevel.INFO
            });
            this.registerProfile({
                name: 'warn',
                prefix: `${ColorEnum.YELLOW}WARN${ColorEnum.WHITE}`,
                logLevel: LogLevel.INFO
            });
            this.registerProfile({
                name: `error`,
                prefix: `${ColorEnum.RED}ERROR${ColorEnum.WHITE}`,
                logLevel: LogLevel.INFO
            });
            this.registerProfile({
                name: 'debug',
                prefix: `${ColorEnum.DARK_GREY}DEBUG${ColorEnum.WHITE}`,
                logLevel: LogLevel.DEBUG
            });
        }

        if (defaultColors) {
            this.formatter.registerColor(ColorEnum.BLACK, 0);
            this.formatter.registerColor(ColorEnum.DARK_RED, 1);
            this.formatter.registerColor(ColorEnum.DARK_GREEN, 2);
            this.formatter.registerColor(ColorEnum.GOLD, 3);
            this.formatter.registerColor(ColorEnum.DARK_BLUE, 4);
            this.formatter.registerColor(ColorEnum.VIOLET, 5);
            this.formatter.registerColor(ColorEnum.CYAN, 6);
            this.formatter.registerColor(ColorEnum.GREY, 7);
            this.formatter.registerColor(ColorEnum.DARK_GREY, 8);
            this.formatter.registerColor(ColorEnum.RED, 9);
            this.formatter.registerColor(ColorEnum.GREEN, 10);
            this.formatter.registerColor(ColorEnum.YELLOW, 11);
            this.formatter.registerColor(ColorEnum.BLUE, 12);
            this.formatter.registerColor(ColorEnum.PINK, 13);
            this.formatter.registerColor(ColorEnum.LIGHT_BLUE, 14);
            this.formatter.registerColor(ColorEnum.WHITE, 15);
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
            for (const [key, value] of this.pipelines) {
                const formattedMessage =
                    this.formatter?.format(message, logProfile, value) ?? '';
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
    public registerPipeline(pipeline: PipelineProps): void {
        this.pipelines.set(
            pipeline.name,
            pipeline instanceof PipelineProps ? pipeline : new Pipeline(pipeline)
        );
    }
}

export default Logger;
