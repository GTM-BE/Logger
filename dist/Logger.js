import Formatter from './Formatter';
import LogProfile from './LogProfile';
import Pipeline from './Pipeline';
import ConsolePipeline from './Pipelines/ConsolePipeline';
import FilePipeline from './Pipelines/FilePipeline';
import ColorEnum from './Types/ColorEnum';
import LogLevel from './Types/LogLevelEnum';
import PipelineProps from './Types/PipelineProps';
class Logger {
    constructor() {
        this.logLevel = LogLevel.INFO;
        this.logProfiles = new Map();
        this.pipelines = new Map();
    }
    enable({ format, loglevel = LogLevel.INFO, pipelines = [], logProfiles = [], defaultPipelines = true, defaultProfiles = true, defaultColors = true }) {
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
    log(profile, message) {
        const logProfile = this.logProfiles.get(profile);
        if (logProfile) {
            for (const [key, value] of this.pipelines) {
                const formattedMessage = this.formatter?.format(message, logProfile, value) ?? '';
                value.pipe(formattedMessage, logProfile, this.logLevel);
            }
            return true;
        }
        return false;
    }
    registerProfile(logProfile) {
        this.logProfiles.set(logProfile.name, logProfile instanceof LogProfile ? logProfile : new LogProfile(logProfile));
    }
    registerPipeline(pipeline) {
        this.pipelines.set(pipeline.name, pipeline instanceof PipelineProps ? pipeline : new Pipeline(pipeline));
    }
}
export default Logger;
//# sourceMappingURL=Logger.js.map