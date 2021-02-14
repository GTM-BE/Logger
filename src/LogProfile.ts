import LogLevel from './Types/LogLevelEnum';
import LogProfileProps from './Types/LogProfileInterface';

class LogProfile implements LogProfileProps {
    public name: string;
    public LogLevel: LogLevel;
    public prefix: string;
    public prefixColor: string;
    public suffixColor: string;

    constructor(profileProps: LogProfileProps) {}
}

export default LogProfile;
