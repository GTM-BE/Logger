"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Formatter_1 = __importDefault(require("./Formatter"));
const LogProfile_1 = __importDefault(require("./LogProfile"));
const Pipeline_1 = __importDefault(require("./Pipeline"));
const ConsolePipeline_1 = __importDefault(require("./Pipelines/ConsolePipeline"));
const FilePipeline_1 = __importDefault(require("./Pipelines/FilePipeline"));
const ColorEnum_1 = __importDefault(require("./Types/ColorEnum"));
const LogLevelEnum_1 = __importDefault(require("./Types/LogLevelEnum"));
const PipelineProps_1 = __importDefault(require("./Types/PipelineProps"));
class Logger {
    constructor() {
        this.logLevel = LogLevelEnum_1.default.INFO;
        this.logProfiles = new Map();
        this.pipelines = new Map();
    }
    enable({ format, loglevel = LogLevelEnum_1.default.INFO, pipelines = [], logProfiles = [], defaultPipelines = true, defaultProfiles = true, defaultColors = true }) {
        this.formatter = new Formatter_1.default(format);
        this.logLevel = loglevel;
        for (const pipeline of pipelines) {
            this.registerPipeline(pipeline);
        }
        if (defaultPipelines) {
            this.registerPipeline(new FilePipeline_1.default('logger'));
            this.registerPipeline(new ConsolePipeline_1.default());
        }
        for (const logProfile of logProfiles) {
            this.registerProfile(logProfile);
        }
        if (defaultProfiles) {
            this.registerProfile({
                name: 'info',
                prefix: `${ColorEnum_1.default.GREEN}INFO${ColorEnum_1.default.WHITE}`,
                logLevel: LogLevelEnum_1.default.INFO
            });
            this.registerProfile({
                name: 'warn',
                prefix: `${ColorEnum_1.default.YELLOW}WARN${ColorEnum_1.default.WHITE}`,
                logLevel: LogLevelEnum_1.default.INFO
            });
            this.registerProfile({
                name: `error`,
                prefix: `${ColorEnum_1.default.RED}ERROR${ColorEnum_1.default.WHITE}`,
                logLevel: LogLevelEnum_1.default.INFO
            });
            this.registerProfile({
                name: 'debug',
                prefix: `${ColorEnum_1.default.DARK_GREY}DEBUG${ColorEnum_1.default.WHITE}`,
                logLevel: LogLevelEnum_1.default.DEBUG
            });
        }
        if (defaultColors) {
            this.formatter.registerColor(ColorEnum_1.default.BLACK, 0);
            this.formatter.registerColor(ColorEnum_1.default.DARK_RED, 1);
            this.formatter.registerColor(ColorEnum_1.default.DARK_GREEN, 2);
            this.formatter.registerColor(ColorEnum_1.default.GOLD, 3);
            this.formatter.registerColor(ColorEnum_1.default.DARK_BLUE, 4);
            this.formatter.registerColor(ColorEnum_1.default.VIOLET, 5);
            this.formatter.registerColor(ColorEnum_1.default.CYAN, 6);
            this.formatter.registerColor(ColorEnum_1.default.GREY, 7);
            this.formatter.registerColor(ColorEnum_1.default.DARK_GREY, 8);
            this.formatter.registerColor(ColorEnum_1.default.RED, 9);
            this.formatter.registerColor(ColorEnum_1.default.GREEN, 10);
            this.formatter.registerColor(ColorEnum_1.default.YELLOW, 11);
            this.formatter.registerColor(ColorEnum_1.default.BLUE, 12);
            this.formatter.registerColor(ColorEnum_1.default.PINK, 13);
            this.formatter.registerColor(ColorEnum_1.default.LIGHT_BLUE, 14);
            this.formatter.registerColor(ColorEnum_1.default.WHITE, 15);
        }
        return this;
    }
    /**
     * Log something to your pipelines
     * @param profile the profile that you want to pipe
     * @param message the message that you want to pipe
     * @returns boolean
     */
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
    /**
     * Register a new Log Profile
     * @param logProfile Your log profile properties
     */
    registerProfile(logProfile) {
        this.logProfiles.set(logProfile.name, logProfile instanceof LogProfile_1.default ? logProfile : new LogProfile_1.default(logProfile));
    }
    /**
     * Register a new pipeline
     * @param pipeline Pipeline properties
     */
    registerPipeline(pipeline) {
        this.pipelines.set(pipeline.name, pipeline instanceof PipelineProps_1.default ? pipeline : new Pipeline_1.default(pipeline));
    }
}
exports.default = Logger;
//# sourceMappingURL=Logger.js.map