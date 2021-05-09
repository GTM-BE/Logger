import LogLevel from '../Types/LogLevelEnum';
import PipelineProps from '../Types/PipelineProps';
import LogProfile from '../LogProfile';
declare class FilePipeline extends PipelineProps {
    private filename;
    constructor(filename?: string);
    private getFilePath;
    pipe(message: string, logProfile: LogProfile, logLevel: number | LogLevel): boolean;
}
export default FilePipeline;
