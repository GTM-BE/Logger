import LogLevelEnum from './LogLevelEnum';

interface PipelineProps {
    name: string;
    pipe: (message: string, logLevel: LogLevelEnum) => boolean;
}

export default PipelineProps;
