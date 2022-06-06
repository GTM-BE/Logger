import * as IO from 'fs';
import * as Path from 'path';

import { Pipeline } from './Pipeline';

class FilePipeline extends Pipeline {
  private logPath = Path.join(process.cwd(), 'logs');
  private fileName = `${new Date().toISOString().split('T')[0]}_${new Date()
    .toTimeString()
    .split(' ')[0]
    .replaceAll(':', '-')}.log`;

  constructor() {
    super({ name: 'filePipeline', includeColors: false });
    if (!IO.existsSync(this.logPath)) {
      IO.mkdirSync(this.logPath);
    } else {
      IO.readdirSync(this.logPath).forEach((file) => {
        // delete log files after 2 weeks                    // week in ms * 2
        IO.statSync(Path.join(this.logPath, file)).ctimeMs + 604800000 * 2 < Date.now() &&
          IO.unlinkSync(Path.join(this.logPath, file));
      });
    }
  }

  /**
   * get filepath for the log file
   * @returns string
   */
  private getFilePath() {
    const filePath = Path.join(this.logPath, this.fileName);
    if (!IO.existsSync(this.logPath)) IO.mkdirSync(this.logPath);
    if (!IO.existsSync(filePath)) IO.writeFileSync(filePath, '', { encoding: 'utf8' });
    return filePath;
  }

  /**
   * Write log to a log file
   * @returns boolean
   */
  public pipe(message: string): boolean {
    try {
      IO.appendFileSync(this.getFilePath(), message + '\n', { encoding: 'utf8' });
    } catch (error) {
      return false;
    }
    return true;
  }
}

export { FilePipeline };
