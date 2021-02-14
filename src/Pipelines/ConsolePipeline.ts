import LogLevel from '../Types/LogLevelEnum';
import PipelineProps from '../Types/PipelineInterface';
import LogProfile from '../LogProfile';

class ConsolePipeline implements PipelineProps {
    public name: string;
    public includeColors?: boolean;

    constructor() {
        this.name = 'consolePipeline';
        this.includeColors = true;
    }

    /**
     * write log to console
     * @returns
     */
    public pipe(
        message: string,
        logProfile: LogProfile,
        logLevel: number | LogLevel
    ): boolean {
        if (logLevel < logProfile.logLevel) console.log(message);
        return true;
    }
}

export default ConsolePipeline;
