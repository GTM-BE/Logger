import LogProfile from '../LogProfile';
import LogLevel from './LogLevelEnum';

abstract class PipelineProps {
    public name: string;
    public includeColors?: boolean;

    constructor(name: string, includeColors: boolean = true) {
        this.name = name;
        this.includeColors = includeColors;
    }

    abstract pipe(
        message: string,
        logProfile: LogProfile,
        logLevel: number | LogLevel
    ): boolean;
}

export default PipelineProps;
