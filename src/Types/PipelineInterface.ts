import LogProfile from '../LogProfile';
import LogLevel from './LogLevelEnum';

interface PipelineProps {
    name: string;
    includeColors?: boolean;
    pipe: (
        message: string,
        logProfile: LogProfile,
        logLevel: number | LogLevel
    ) => boolean;
}

export default PipelineProps;
