import { LogProfile } from '../Types/LogProfile';
import { Pipeline } from './Pipeline';
class ConsolePipeline extends Pipeline {
  constructor() {
    super({ name: 'consolePipeline', includeColors: true });
  }

  /**
   * write log to console
   * @returns
   */
  public pipe(message: string, logProfile: LogProfile, logLevel: number): boolean {
    if (logLevel >= logProfile.logLevel) console.log(message);
    return true;
  }
}

export { ConsolePipeline };
