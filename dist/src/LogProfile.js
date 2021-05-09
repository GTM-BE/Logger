"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogLevelEnum_1 = __importDefault(require("./Types/LogLevelEnum"));
class LogProfile {
    constructor({ name, prefix, logLevel = LogLevelEnum_1.default.INFO }) {
        this.name = name;
        this.prefix = prefix;
        this.logLevel = logLevel;
    }
}
exports.default = LogProfile;
//# sourceMappingURL=LogProfile.js.map