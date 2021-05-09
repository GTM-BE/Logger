import LogProfile from '../LogProfile';
import LogLevel from './LogLevelEnum';
declare abstract class PipelineProps {
    name: string;
    includeColors?: boolean;
    constructor(name: string, includeColors?: boolean);
    abstract pipe(message: string, logProfile: LogProfile, logLevel: number | LogLevel): boolean;
}
export default PipelineProps;
//# sourceMappingURL=PipelineProps.d.ts.map