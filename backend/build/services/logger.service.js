"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs_1 = __importDefault(require("fs"));
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const logsDir = "./logs";
if (!fs_1.default.existsSync(logsDir)) {
    fs_1.default.mkdirSync(logsDir);
}
//define the time format
function getTime() {
    const now = new Date();
    return now.toLocaleString("he");
}
function isError(e) {
    return e instanceof Error && !!e.stack && !!e.message;
}
function doLog(level, ...args) {
    const strs = args.map(arg => typeof arg === "string" || isError(arg) ? arg : JSON.stringify(arg));
    let line = strs.join(" | ");
    line = `${getTime()} - ${level} - ${line}\n`;
    switch (level) {
        case "DEBUG":
            line = ansi_colors_1.default.bgMagenta(line);
            break;
        case "INFO":
            line = ansi_colors_1.default.bgGreen(line);
            break;
        case "SUCCESS":
            line = ansi_colors_1.default.bgBlue(line);
            break;
        case "WARN":
            line = ansi_colors_1.default.bgYellow(line);
            break;
        case "ERROR":
            line = ansi_colors_1.default.bgRed(line);
            break;
    }
    console.log(line);
    fs_1.default.appendFile("./logs/backend.log", line, (err) => {
        if (err)
            console.log(ansi_colors_1.default.red("FATAL: cannot write to log file"));
    });
}
function debug(...args) {
    if (process.env.NODE_NEV === "production")
        return;
    doLog("DEBUG", ...args);
}
function info(...args) {
    doLog("INFO", ...args);
}
function success(...args) {
    doLog("SUCCESS", ...args);
}
function warn(...args) {
    doLog("WARN", ...args);
}
function error(...args) {
    doLog("ERROR", ...args);
}
exports.logger = {
    debug,
    info,
    success,
    warn,
    error,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLHVEQUF1RDtBQUN2RCw0Q0FBb0I7QUFDcEIsOERBQXFDO0FBRXJDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQztBQUN6QixJQUFJLENBQUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUMzQixZQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ3ZCO0FBRUQsd0JBQXdCO0FBQ3hCLFNBQVMsT0FBTztJQUNkLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDdkIsT0FBTyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FBQyxDQUFNO0lBQ3JCLE9BQU8sQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN4RCxDQUFDO0FBRUQsU0FBUyxLQUFLLENBQUMsS0FBYSxFQUFFLEdBQUcsSUFBa0Q7SUFDakYsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUMxQixPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQ3BFLENBQUM7SUFFRixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTVCLElBQUksR0FBRyxHQUFHLE9BQU8sRUFBRSxNQUFNLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQztJQUM3QyxRQUFRLEtBQUssRUFBRTtRQUNiLEtBQUssT0FBTztZQUNWLElBQUksR0FBRyxxQkFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxNQUFNO1FBQ1IsS0FBSyxNQUFNO1lBQ1QsSUFBSSxHQUFHLHFCQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLE1BQU07UUFDUixLQUFLLFNBQVM7WUFDWixJQUFJLEdBQUcscUJBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsTUFBTTtRQUNSLEtBQUssTUFBTTtZQUNULElBQUksR0FBRyxxQkFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxNQUFNO1FBQ1IsS0FBSyxPQUFPO1lBQ1YsSUFBSSxHQUFHLHFCQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLE1BQU07S0FDVDtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsWUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFRLEVBQUUsRUFBRTtRQUNyRCxJQUFJLEdBQUc7WUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLEtBQUssQ0FBQyxHQUFHLElBQWM7SUFDOUIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZO1FBQUUsT0FBTztJQUNsRCxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUVELFNBQVMsSUFBSSxDQUFDLEdBQUcsSUFBVztJQUMxQixLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUVELFNBQVMsT0FBTyxDQUFDLEdBQUcsSUFBVztJQUM3QixLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUVELFNBQVMsSUFBSSxDQUFDLEdBQUcsSUFBVztJQUMxQixLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUVELFNBQVMsS0FBSyxDQUFDLEdBQUcsSUFBMkI7SUFDM0MsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBRztJQUNwQixLQUFLO0lBQ0wsSUFBSTtJQUNKLE9BQU87SUFDUCxJQUFJO0lBQ0osS0FBSztDQUNOLENBQUMifQ==