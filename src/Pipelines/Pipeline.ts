import { LogProfile } from '../Index';

abstract class Pipeline {
  public name: string;
  public includeColors: boolean;

  constructor({ name, includeColors = true }: { name: string; includeColors?: boolean }) {
    this.name = name;
    this.includeColors = includeColors;
  }

  abstract pipe(message: string, logProfile: LogProfile, logLevel: number): boolean;
}

export { Pipeline };
