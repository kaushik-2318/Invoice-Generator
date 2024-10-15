"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchPuppeteer = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
// Define a function to launch Puppeteer with the correct settings
const launchPuppeteer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Launch Puppeteer with the correct executablePath and necessary flags
        const browser = yield puppeteer_1.default.launch({
            executablePath: process.env.CHROME_EXECUTABLE_PATH || '/usr/bin/google-chrome-stable', // Default to a path if env is not set
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // For cloud environments
        });
        return browser;
    }
    catch (error) {
        console.error('Error launching Puppeteer:', error);
        throw error;
    }
});
exports.launchPuppeteer = launchPuppeteer;
