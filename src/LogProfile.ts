import LogLevel from './Types/LogLevelEnum';
import LogProfileProps from './Types/LogProfileInterface';

class LogProfile implements LogProfileProps {
    public name: string;
    public logLevel: LogLevel;
    public prefix: string;

    constructor({ name, prefix, logLevel = LogLevel.INFO }: LogProfileProps) {
        this.name = name;
        this.prefix = prefix;
        this.logLevel = logLevel;
    }
}

export default LogProfile;
