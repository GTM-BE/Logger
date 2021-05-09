"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PipelineProps_1 = __importDefault(require("../Types/PipelineProps"));
class ConsolePipeline extends PipelineProps_1.default {
    constructor() {
        super('consolePipeline', true);
    }
    /**
     * write log to console
     * @returns
     */
    pipe(message, logProfile, logLevel) {
        if (logLevel <= logProfile.logLevel)
            console.log(message);
        return true;
    }
}
exports.default = ConsolePipeline;
//# sourceMappingURL=ConsolePipeline.js.map