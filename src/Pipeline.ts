import LogLevel from './Types/LogLevelEnum';
import PipelineProps from './Types/PipelineInterface';

class Pipeline implements PipelineProps {
 public  name: string;
public pipe: (message: string, logLevel: LogLevel) => boolean;

    constructor({name, pipe}: PipelineProps) {
      this.name = name;
      this.pipe = pipe;
    }

}

export default Pipeline;
