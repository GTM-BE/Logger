import LogLevel from './Types/LogLevelEnum';
class LogProfile {
    constructor({ name, prefix, logLevel = LogLevel.INFO }) {
        this.name = name;
        this.prefix = prefix;
        this.logLevel = logLevel;
    }
}
export default LogProfile;
//# sourceMappingURL=LogProfile.js.map