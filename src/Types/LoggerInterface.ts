import PipelineProps from './PipelineInterface';
import LogProfileProps from './LogProfileInterface';
import LogLevel from './LogLevelEnum';

interface LoggerProps {
    format?: string;
    loglevel?: number | LogLevel;
    pipelines?: PipelineProps[];
    logProfiles?: LogProfileProps[];
    defaultPipelines?: boolean;
    defaultProfiles?: boolean;
    defaultColors?: boolean;
}

export default LoggerProps;
