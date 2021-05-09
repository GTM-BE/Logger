import LogProfile from './LogProfile';
import PipelineProps from './Types/PipelineProps';
declare class Formatter {
    template: string;
    colors: Map<string, string>;
    placeholder: Map<string, (message: string, profile: LogProfile) => string>;
    static COLOR_REGEX: RegExp;
    static PLACEHOLDER_REGEX: RegExp;
    static DEFAULT_FORMAT: string;
    /**
     * Helper for message formatting
     * @param template Schema to build your message
     */
    constructor(template?: string);
    format(message: string, profile: LogProfile, pipeline: PipelineProps): string;
    /**
     * Register a new color to the logger
     * @param key key for color
     * @param id color id see: https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
     * @returns formatted key
     */
    registerColor(key: string, id: number): string;
    /**
     * Get message without color placeholder
     * @param message message with color placeholder
     * @returns message without color placeholder
     */
    removeColor(message: string): string;
    /**
     * Get message iwth ansi escape color codes
     * @param message message with color placeholder
     * @returns message with ansi escape color codes
     */
    replaceColor(message: string): string;
    /**
     * Register a new placeholder to the logger
     * @param key key for your placeholder
     * @param replaceFunction function that returns string to replace placeholder
     * @returns formatted key
     */
    registerPlaceholder(key: string, replaceFunction: (message: string, profile: LogProfile) => string): string;
    /**
     *
     * @param message your message with placeholder
     * @param profile profile of the message
     * @returns formatted message
     */
    replacePlaceholder(message: string, profile: LogProfile): string;
}
export default Formatter;
//# sourceMappingURL=Formatter.d.ts.map