import LogLevel from './Types/LogLevelEnum';
import LogProfileProps from './Types/LogProfileInterface';

class LogProfile implements LogProfileProps {
    public name: string;
    public logLevel: LogLevel;
    public prefix: string;
    public prefixColor: string;
    public suffixColor: string;

    constructor({
        name,
        prefix,
        logLevel = LogLevel.INFO,
        prefixColor = '',
        suffixColor = ''
    }: LogProfileProps) {
        this.name = name;
        this.prefix = prefix;
        this.logLevel = logLevel;
        this.prefixColor = prefixColor;
        this.suffixColor = suffixColor;
    }
}

export default LogProfile;
