import LogLevelEnum from './LogLevelEnum';

interface LogProfileProps {
    name: string;
     prefix: string;
    LogLevel: LogLevelEnum;
     prefixColor?: string;
     suffixColor?: string;
}

export default LogProfileProps;
