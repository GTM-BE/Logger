import LogLevel from '../Types/LogLevelEnum';
import PipelineProps from '../Types/PipelineProps';
import LogProfile from '../LogProfile';

class ConsolePipeline extends PipelineProps {
    constructor() {
        super('consolePipeline', true);
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
        if (logLevel >= logProfile.logLevel) console.log(message);
        return true;
    }
}

export default ConsolePipeline;
