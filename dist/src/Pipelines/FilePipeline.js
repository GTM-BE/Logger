"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IO = __importStar(require("fs"));
const PipelineProps_1 = __importDefault(require("../Types/PipelineProps"));
class FilePipeline extends PipelineProps_1.default {
    constructor(filename = 'latest') {
        super('filePipeline', false);
        this.filename = filename;
    }
    /**
    * get filepath for the log file
    * @returns string
    */
    getFilePath() {
        const path = `${process.cwd()}/logs/`;
        if (!IO.existsSync(path))
            IO.mkdirSync(path);
        const filePath = `${path}${this.filename}.log`;
        return filePath;
    }
    /**
     * Write log to a log file
     * @returns boolean
     */
    pipe(message, logProfile, logLevel) {
        IO.appendFileSync(this.getFilePath(), message + '\n');
        return true;
    }
}
exports.default = FilePipeline;
//# sourceMappingURL=FilePipeline.js.map