import * as IO from 'fs';
import PipelineProps from '../Types/PipelineProps';
class FilePipeline extends PipelineProps {
    constructor(filename = 'latest') {
        super('filePipeline', false);
        this.filename = filename;
    }
    getFilePath() {
        const path = `${process.cwd()}/logs/`;
        if (!IO.existsSync(path))
            IO.mkdirSync(path);
        const filePath = `${path}${this.filename}.log`;
        return filePath;
    }
    pipe(message, logProfile, logLevel) {
        IO.appendFileSync(this.getFilePath(), message + '\n');
        return true;
    }
}
export default FilePipeline;
//# sourceMappingURL=FilePipeline.js.map