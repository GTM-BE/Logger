import * as IO from 'fs';
import { Pipeline } from './Pipeline';

class FilePipeline extends Pipeline {
  private filename: string;

  constructor(filename = 'latest') {
    super({ name: 'filePipeline', includeColors: false });
    this.filename = filename;
  }

  /**
   * get filepath for the log file
   * @returns string
   */
  private getFilePath() {
    const path = `${process.cwd()}/logs/`;
    if (!IO.existsSync(path)) IO.mkdirSync(path);
    const filePath = `${path}${this.filename}.log`;
    return filePath;
  }

  /**
   * Write log to a log file
   * @returns boolean
   */
  public pipe(message: string): boolean {
    IO.appendFileSync(this.getFilePath(), message + '\n');
    return true;
  }
}

export { FilePipeline };
