import LogProfile from './LogProfile';
import PipelineProps from './Types/PipelineProps';
declare class Formatter {
    template: string;
    colors: Map<string, string>;
    placeholder: Map<string, (message: string, profile: LogProfile) => string>;
    static COLOR_REGEX: RegExp;
    static PLACEHOLDER_REGEX: RegExp;
    static DEFAULT_FORMAT: string;
    constructor(template?: string);
    format(message: string, profile: LogProfile, pipeline: PipelineProps): string;
    registerColor(key: string, id: number): string;
    removeColor(message: string): string;
    replaceColor(message: string): string;
    registerPlaceholder(key: string, replaceFunction: (message: string, profile: LogProfile) => string): string;
    replacePlaceholder(message: string, profile: LogProfile): string;
}
export default Formatter;
