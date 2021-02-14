import PipelineProps from './PipelineInterface';
import LogProfileProps from './LogProfileInterface';

interface LoggerProps {
    format: string;
    loglevel?: number;
    pipelines?: PipelineProps[];
    logProfiles?: LogProfileProps[];
}

export default LoggerProps;
