import LogLevel from '../Types/LogLevelEnum';
import * as IO from 'fs';
import PipelineProps from '../Types/PipelineProps';
import LogProfile from '../LogProfile';

class FilePipeline extends PipelineProps {
    private filename: string;

    constructor(filename: string = 'latest') {
        super('filePipeline', false);
        this.filename = filename;
    }

     /**
     * get filepath for the log file
     * @returns string
     */
    private getFilePath() {
        const path = `${process.cwd()}/logs/`;
        if (!IO.existsSync(path)) IO.mkdirSync(path);
        const filePath: string = `${path}${this.filename}.log`;
        return filePath
    }

    /**
     * Write log to a log file
     * @returns boolean
     */
    public pipe(
        message: string,
        logProfile: LogProfile,
        logLevel: number | LogLevel
    ): boolean {
        IO.appendFileSync(this.getFilePath(), message + '\n');
        return true;
    }
}

export default FilePipeline;
