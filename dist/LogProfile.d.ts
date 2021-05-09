import LogLevel from './Types/LogLevelEnum';
import LogProfileProps from './Types/LogProfileInterface';
declare class LogProfile implements LogProfileProps {
    name: string;
    logLevel: LogLevel;
    prefix: string;
    constructor({ name, prefix, logLevel }: LogProfileProps);
}
export default LogProfile;
