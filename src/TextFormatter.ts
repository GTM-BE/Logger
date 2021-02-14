class TextFormatter {
    public colors: Map<string, string> = new Map();
    public placeholder: Map<string, () => string> = new Map();

    public static COLOR_REGEX: RegExp = new RegExp(/%[a-zA-Z_]*%/gm);
    public static PLACEHOLDER_REGEX: RegExp = new RegExp(/{{[a-zA-Z_]*}}/gm);

    /**
     * Register a new color to the logger
     * @param key key for color
     * @param id color id see: https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
     * @returns formatted key
     */
    public registerColor(key: string, id: number): string {
        key = `%${key}%`;
        this.colors.set(key, `\u001b[38;5;${id}m`);
        return '';
    }

    /**
     * Get message without color placeholder
     * @param message message with color placeholder
     * @returns message without color placeholder
     */
    public removeColor(message: string): string {
        message = message.replace(TextFormatter.COLOR_REGEX, '');
        return message;
    }

    /**
     * Get message iwth ansi escape color codes
     * @param message message with color placeholder
     * @returns message with ansi escape color codes
     */
    public replaceColor(message: string): string {
        const keys: string[] = message.match(TextFormatter.COLOR_REGEX);
        for (const key of keys) {
            if (this.colors.has(key)) {
                message = message.replace(key, this.colors.get(key));
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
    public registerPlaceholder(key, replaceFunction: () => string): string {
        key = `{{${key}}}`;
        this.placeholder.set(key, replaceFunction);
        return key;
    }

    public replacePlaceholder(message: string): string {
        const keys: string[] = message.match(TextFormatter.PLACEHOLDER_REGEX);
        for (const key of keys) {
            if (this.colors.has(key)) {
                message = message.replace(key, this.placeholder.get(key)());
            }
        }
        return message;
    }
}

export default TextFormatter;
