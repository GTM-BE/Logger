import LogLevel from '../Types/LogLevelEnum';
import PipelineProps from '../Types/PipelineProps';
import LogProfile from '../LogProfile';
declare class ConsolePipeline extends PipelineProps {
    constructor();
    /**
     * write log to console
     * @returns
     */
    pipe(message: string, logProfile: LogProfile, logLevel: number | LogLevel): boolean;
}
export default ConsolePipeline;
//# sourceMappingURL=ConsolePipeline.d.ts.map