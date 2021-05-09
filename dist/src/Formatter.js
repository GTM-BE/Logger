"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ColorEnum_1 = __importDefault(require("./Types/ColorEnum"));
const PlaceholderEnum_1 = __importDefault(require("./Types/PlaceholderEnum"));
class Formatter {
    /**
     * Helper for message formatting
     * @param template Schema to build your message
     */
    constructor(template = Formatter.DEFAULT_FORMAT) {
        this.colors = new Map();
        this.placeholder = new Map();
        this.template = template;
        // Register default Placeholder
        // Placeholder.DATE
        this.registerPlaceholder('prefix', (message, profile) => profile.prefix);
        // Placeholder.MESSAGE
        this.registerPlaceholder('message', (message, profile) => message);
        // Placeholder.TIME
        this.registerPlaceholder('time', (message, profile) => {
            const date = new Date();
            return `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`;
        });
        // Placeholder.DATE
        this.registerPlaceholder('date', (message, profile) => new Date().toISOString().replace(/(-)/gm, '/').split('T')[0]);
    }
    format(message, profile, pipeline) {
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
    registerColor(key, id) {
        this.colors.set(key, `\u001b[38;5;${id}m`);
        return key;
    }
    /**
     * Get message without color placeholder
     * @param message message with color placeholder
     * @returns message without color placeholder
     */
    removeColor(message) {
        message = message.replace(Formatter.COLOR_REGEX, '');
        return message;
    }
    /**
     * Get message iwth ansi escape color codes
     * @param message message with color placeholder
     * @returns message with ansi escape color codes
     */
    replaceColor(message) {
        const keys = message.match(Formatter.COLOR_REGEX) ?? [];
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
    registerPlaceholder(key, replaceFunction) {
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
    replacePlaceholder(message, profile) {
        message = this.template.replace(PlaceholderEnum_1.default.MESSAGE, message);
        const keys = message.match(Formatter.PLACEHOLDER_REGEX) ?? [];
        for (const key of keys) {
            const repalceContent = this.placeholder.get(key);
            if (repalceContent) {
                message = message.replace(key, repalceContent(message, profile));
            }
        }
        return message;
    }
}
Formatter.COLOR_REGEX = new RegExp(/%[a-zA-Z_]*%/gm);
Formatter.PLACEHOLDER_REGEX = new RegExp(/{{[a-zA-Z_]*}}/gm);
Formatter.DEFAULT_FORMAT = `${ColorEnum_1.default.GREY}[${ColorEnum_1.default.DARK_GREY}${PlaceholderEnum_1.default.TIME}${ColorEnum_1.default.GREY}] ${PlaceholderEnum_1.default.PREFIX}${ColorEnum_1.default.GREY} >>> ${PlaceholderEnum_1.default.MESSAGE}`;
exports.default = Formatter;
//# sourceMappingURL=Formatter.js.map