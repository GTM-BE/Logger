import PipelineProps from '../Types/PipelineProps';
class ConsolePipeline extends PipelineProps {
    constructor() {
        super('consolePipeline', true);
    }
    pipe(message, logProfile, logLevel) {
        if (logLevel <= logProfile.logLevel)
            console.log(message);
        return true;
    }
}
export default ConsolePipeline;
//# sourceMappingURL=ConsolePipeline.js.map