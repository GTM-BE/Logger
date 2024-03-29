import { Pipeline } from './Pipelines/Pipeline';
import { Colors } from './Types/Colors';
import { LogProfile } from './Types/LogProfile';
import { Placeholder } from './Types/Placeholder';

class Formatter {
  public template: string;
  public colors: Map<string, string> = new Map();
  public placeholder: Map<string, (message: string, profile: LogProfile) => string> =
    new Map();

  public static COLOR_REGEX = new RegExp(/%[a-zA-Z_]*%/gm);
  public static PLACEHOLDER_REGEX = new RegExp(/{{[a-zA-Z_]*}}/gm);
  public static DEFAULT_FORMAT = `${Colors.GREY}[${Colors.DARK_GREY}${Placeholder.TIME}${Colors.GREY}] ${Placeholder.PREFIX}${Colors.GREY} >>> ${Placeholder.MESSAGE} ${Colors.RESET}`;

  /**
   * Helper for message formatting
   * @param template Schema to build your message
   */
  constructor(template: string = Formatter.DEFAULT_FORMAT) {
    this.template = template;

    this.colors.set(Colors.RESET, `\u001b[0m`);

    // Placeholder.PREFIX
    this.registerPlaceholder(
      'prefix',
      (message: string, profile: LogProfile): string =>
        (profile.prefixColor ?? Colors.WHITE) + profile.prefix
    );

    // Placeholder.MESSAGE
    /*
    this.registerPlaceholder(
      'message',
      (message: string, profile: LogProfile): string =>
    );
    */

    // Placeholder.TIME
    this.registerPlaceholder('time', (): string => {
      const date = new Date();
      return `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      }:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`;
    });

    // Placeholder.DATE
    this.registerPlaceholder(
      'date',
      (): string => new Date().toISOString().replace(/(-)/gm, '/').split('T')[0]
    );
  }

  public format(message: string, profile: LogProfile, pipeline: Pipeline): string {
    message = this.replacePlaceholder(message, profile);
    message = pipeline.includeColors
      ? this.replaceColor(message)
      : this.removeColor(message);
    return message;
  }

  /**
   * Register a new color to the logger
   * @param key key for color
   * @param id color id see: https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
   * @returns formatted key
   */
  public registerColor(key: string, id: number): string {
    this.colors.set(key, `\u001b[38;5;${id}m`);
    return key;
  }

  /**
   * Get message without color placeholder
   * @param message message with color placeholder
   * @returns message without color placeholder
   */
  public removeColor(message: string): string {
    message = message.replace(Formatter.COLOR_REGEX, '');
    return message;
  }

  /**
   * Get message iwth ansi escape color codes
   * @param message message with color placeholder
   * @returns message with ansi escape color codes
   */
  public replaceColor(message: string): string {
    const keys: string[] = message.match(Formatter.COLOR_REGEX) ?? [];
    for (const key of keys) {
      if (this.colors.has(key)) {
        message = message.replace(key, this.colors.get(key) ?? '');
      }
    }
    return message;
  }

  /**
   * Register a new placeholder to the logger
   * @param key key for your placeholder
   * @param replaceFunction function that returns string to replace placeholder
   * @returns formatted key
   */
  public registerPlaceholder(
    key: string,
    replaceFunction: (message: string, profile: LogProfile) => string
  ): string {
    key = `{{${key}}}`;
    this.placeholder.set(key, replaceFunction);
    return key;
  }

  /**
   *
   * @param message your message with placeholder
   * @param profile profile of the message
   * @returns formatted message
   */
  public replacePlaceholder(message: string, profile: LogProfile): string {
    message = this.template.replace(
      Placeholder.MESSAGE,
      (profile.suffixColor ?? Colors.WHITE) + message
    );
    const keys: string[] = message.match(Formatter.PLACEHOLDER_REGEX) ?? [];
    for (const key of keys) {
      const repalceContent = this.placeholder.get(key);
      if (repalceContent) {
        message = message.replace(key, repalceContent(message, profile));
      }
    }
    return message;
  }
}

export { Formatter };
