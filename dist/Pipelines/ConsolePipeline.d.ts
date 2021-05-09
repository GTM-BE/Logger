import LogLevel from '../Types/LogLevelEnum';
import PipelineProps from '../Types/PipelineProps';
import LogProfile from '../LogProfile';
declare class ConsolePipeline extends PipelineProps {
    constructor();
    pipe(message: string, logProfile: LogProfile, logLevel: number | LogLevel): boolean;
}
export default ConsolePipeline;
