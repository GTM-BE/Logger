import ColorEnum from './Types/ColorEnum';
import Placeholder from './Types/PlaceholderEnum';
class Formatter {
    constructor(template = Formatter.DEFAULT_FORMAT) {
        this.colors = new Map();
        this.placeholder = new Map();
        this.template = template;
        this.registerPlaceholder('prefix', (message, profile) => profile.prefix);
        this.registerPlaceholder('message', (message, profile) => message);
        this.registerPlaceholder('time', (message, profile) => {
            const date = new Date();
            return `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`;
        });
        this.registerPlaceholder('date', (message, profile) => new Date().toISOString().replace(/(-)/gm, '/').split('T')[0]);
    }
    format(message, profile, pipeline) {
        message = this.replacePlaceholder(message, profile);
        message = pipeline.includeColors
            ? this.replaceColor(message)
            : this.removeColor(message);
        return message;
    }
    registerColor(key, id) {
        this.colors.set(key, `\u001b[38;5;${id}m`);
        return key;
    }
    removeColor(message) {
        message = message.replace(Formatter.COLOR_REGEX, '');
        return message;
    }
    replaceColor(message) {
        const keys = message.match(Formatter.COLOR_REGEX) ?? [];
        for (const key of keys) {
            if (this.colors.has(key)) {
                message = message.replace(key, this.colors.get(key) ?? '');
            }
        }
        return message;
    }
    registerPlaceholder(key, replaceFunction) {
        key = `{{${key}}}`;
        this.placeholder.set(key, replaceFunction);
        return key;
    }
    replacePlaceholder(message, profile) {
        message = this.template.replace(Placeholder.MESSAGE, message);
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
Formatter.DEFAULT_FORMAT = `${ColorEnum.GREY}[${ColorEnum.DARK_GREY}${Placeholder.TIME}${ColorEnum.GREY}] ${Placeholder.PREFIX}${ColorEnum.GREY} >>> ${Placeholder.MESSAGE}`;
export default Formatter;
//# sourceMappingURL=Formatter.js.map