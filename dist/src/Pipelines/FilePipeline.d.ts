import LogLevel from '../Types/LogLevelEnum';
import PipelineProps from '../Types/PipelineProps';
import LogProfile from '../LogProfile';
declare class FilePipeline extends PipelineProps {
    private filename;
    constructor(filename?: string);
    /**
    * get filepath for the log file
    * @returns string
    */
    private getFilePath;
    /**
     * Write log to a log file
     * @returns boolean
     */
    pipe(message: string, logProfile: LogProfile, logLevel: number | LogLevel): boolean;
}
export default FilePipeline;
//# sourceMappingURL=FilePipeline.d.ts.map