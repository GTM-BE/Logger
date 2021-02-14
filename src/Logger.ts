import LogProfile from './LogProfile';
import LoggerProps from './Types/LoggerInterface';
import LogLevel from './Types/LogLevelEnum';

class Logger {
    public format: string = '';
    public logLevel: LogLevel;
    public logProfiles: LogProfile[];

    constructor({
        format,
        loglevel = LogLevel.INFO,
        pipelines = [],
        logProfiles = []
    }: LoggerProps) {
        this.format = format;
        this.logLevel = loglevel;
    }

    /**
     * Log something to your pipelines
     * @param profile
     * @param message
     */
    public log(profile: string, message: string): void {}
}

export default Logger;
