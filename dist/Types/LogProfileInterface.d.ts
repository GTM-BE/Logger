import LogLevel from './LogLevelEnum';
interface LogProfileProps {
    name: string;
    prefix: string;
    logLevel: number | LogLevel;
    prefixColor?: string;
    suffixColor?: string;
}
export default LogProfileProps;
