import LogLevel from '../Types/LogLevelEnum';
import * as IO from 'fs';
import PipelineProps from '../Types/PipelineInterface';
import LogProfile from '../LogProfile';

class FilePipeline implements PipelineProps {
    public name: string;
    private filename: string;
    public includeColors?: boolean;

    constructor(filename: string = 'latest') {
        this.filename = filename;
        this.name = 'filePipeline';
        this.includeColors = false;
    }

    /**
     * Write log to a log file
     * @returns
     */
    public pipe(
        message: string,
        logProfile: LogProfile,
        logLevel: number | LogLevel
    ): boolean {
        IO.appendFileSync(this.filePath, message + '\n');
        return true;
    }

    /**
     * get filepath for the log file
     */
    public get filePath() {
        const path = `${process.cwd()}/logs/`;
        if (!IO.existsSync(path)) IO.mkdirSync(path);
        return `${path}${this.filename}.log`;
    }
}

export default FilePipeline;
