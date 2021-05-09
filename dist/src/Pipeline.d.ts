import LogProfile from './LogProfile';
import LogLevel from './Types/LogLevelEnum';
import PipelineProps from './Types/PipelineProps';
declare class Pipeline implements PipelineProps {
    name: string;
    includeColors: boolean;
    pipe: (message: string, logProfile: LogProfile, logLevel: number | LogLevel) => boolean;
    constructor({ name, pipe, includeColors }: PipelineProps);
}
export default Pipeline;
//# sourceMappingURL=Pipeline.d.ts.map