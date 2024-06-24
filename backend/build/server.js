"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = require("./services/logger.service");
process.on("uncaughtException", (err) => {
    logger_service_1.logger.error("Uncaught exception:", err.name, err.message);
    process.exit(1);
});
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 3030;
const server = app_1.default.listen(port, () => {
    logger_service_1.logger.info(`Server is running on port: ${port}`);
});
process.on("unhandledRejection", (err) => {
    logger_service_1.logger.error("Unhandled rejection:", err);
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUFtRDtBQUVuRCxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUMsR0FBVSxFQUFFLEVBQUU7SUFDN0MsdUJBQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQztBQUVILGdEQUF3QjtBQUV4QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFFdEMsTUFBTSxNQUFNLEdBQUcsYUFBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQ25DLHVCQUFNLENBQUMsSUFBSSxDQUFDLDhCQUE4QixJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3BELENBQUMsQ0FBQyxDQUFDO0FBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLEdBQVUsRUFBRSxFQUFFO0lBQzlDLHVCQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO1FBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9