"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const html_sanitizer_middleware_1 = __importDefault(require("./middlewares/html-sanitizer.middleware"));
const hpp_1 = __importDefault(require("hpp"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const logger_middleware_1 = require("./middlewares/logger.middleware");
const error_service_1 = require("./services/error.service");
const store_routes_1 = __importDefault(require("./api/store/store.routes"));
const rate_limiter_service_1 = require("./services/rate-limiter.service");
const isProdEnv = process.env.NODE_ENV === "production";
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(helmet_1.default.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "img-src": ["'self'", "https: data:"],
    },
}));
app.use(express_1.default.json({
    limit: "10kb",
}));
app.use(rate_limiter_service_1.requestLimiter);
app.use(html_sanitizer_middleware_1.default);
app.use((0, hpp_1.default)({
    whitelist: [], // add whitelisted query params here
}));
// cors
if (isProdEnv) {
    app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "build", "public")));
}
else {
    const corsOptions = {
        origin: [
            "http://127.0.0.1:8080",
            "http://localhost:8080",
            "http://127.0.0.1:5173",
            "http://localhost:5173",
        ],
        credentials: true,
    };
    app.use((0, cors_1.default)(corsOptions));
}
if (!isProdEnv) {
    app.use((req, res, next) => {
        (0, logger_middleware_1.requestLogger)(req, res, next);
    });
}
app.use("/api/store", store_routes_1.default);
app.get("/**", (req, res) => {
    res.sendFile(path_1.default.join(path_1.default.resolve(), "build", "public", "index.html"));
});
app.all("*", (req, res, next) => {
    next(new error_service_1.AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(error_service_1.errorHandler);
exports.default = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHNEQUE4QjtBQUM5QixvREFBNEI7QUFDNUIsd0dBQXVFO0FBQ3ZFLDhDQUFzQjtBQUN0QixnREFBd0I7QUFDeEIsZ0RBQXdCO0FBQ3hCLHVFQUFnRTtBQUNoRSw0REFBa0U7QUFDbEUsNEVBQW1EO0FBQ25ELDBFQUFpRTtBQUVqRSxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUM7QUFFeEQsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFFdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGdCQUFNLEdBQUUsQ0FBQyxDQUFDO0FBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQ0wsZ0JBQU0sQ0FBQyxxQkFBcUIsQ0FBQztJQUMzQixXQUFXLEVBQUUsSUFBSTtJQUNqQixVQUFVLEVBQUU7UUFDVixTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDO0tBQ3RDO0NBQ0YsQ0FBQyxDQUNILENBQUM7QUFFRixHQUFHLENBQUMsR0FBRyxDQUNMLGlCQUFPLENBQUMsSUFBSSxDQUFDO0lBQ1gsS0FBSyxFQUFFLE1BQU07Q0FDZCxDQUFDLENBQ0gsQ0FBQztBQUVGLEdBQUcsQ0FBQyxHQUFHLENBQUMscUNBQWMsQ0FBQyxDQUFDO0FBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUNBQWdCLENBQUMsQ0FBQztBQUMxQixHQUFHLENBQUMsR0FBRyxDQUNMLElBQUEsYUFBRyxFQUFDO0lBQ0YsU0FBUyxFQUFFLEVBQUUsRUFBRSxvQ0FBb0M7Q0FDcEQsQ0FBQyxDQUNILENBQUM7QUFFRixPQUFPO0FBQ1AsSUFBSSxTQUFTLEVBQUU7SUFDYixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsTUFBTSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsY0FBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdkU7S0FBTTtJQUNMLE1BQU0sV0FBVyxHQUFHO1FBQ2xCLE1BQU0sRUFBRTtZQUNOLHVCQUF1QjtZQUN2Qix1QkFBdUI7WUFDdkIsdUJBQXVCO1lBQ3ZCLHVCQUF1QjtTQUN4QjtRQUNELFdBQVcsRUFBRSxJQUFJO0tBQ2xCLENBQUM7SUFDRixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsY0FBSSxFQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Q0FDNUI7QUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFO0lBQ2QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1FBQzFELElBQUEsaUNBQWEsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0NBQ0o7QUFFRCxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxzQkFBVyxDQUFDLENBQUM7QUFFbkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDN0MsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLGNBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDM0UsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQy9ELElBQUksQ0FBQyxJQUFJLHdCQUFRLENBQUMsY0FBYyxHQUFHLENBQUMsV0FBVyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNFLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyw0QkFBWSxDQUFDLENBQUM7QUFFdEIsa0JBQWUsR0FBRyxDQUFDIn0=