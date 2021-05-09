import LogProfile from './LogProfile';
import LogLevel from './Types/LogLevelEnum';
import PipelineProps from './Types/PipelineProps';

class Pipeline implements PipelineProps {
    public name: string;
    public includeColors: boolean;
    public pipe: (
        message: string,
        logProfile: LogProfile,
        logLevel: number | LogLevel
    ) => boolean;

    constructor({ name, pipe, includeColors = true }: PipelineProps) {
        this.name = name;
        this.includeColors = includeColors;
        this.pipe = pipe;
    }
}

export default Pipeline;
