"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const requestSanitizer = async (req, res, next) => {
    const { body } = req;
    const { params } = req;
    const { query } = req;
    if (body) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sanitizeBody = (body) => {
            for (const key in body) {
                if (typeof body[key] === "string") {
                    body[key] = (0, sanitize_html_1.default)(body[key]);
                }
                else if (typeof body[key] === "object") {
                    sanitizeBody(body[key]);
                }
            }
        };
        sanitizeBody(body);
    }
    if (params) {
        for (const key in params) {
            if (typeof params[key] === "string") {
                params[key] = (0, sanitize_html_1.default)(params[key]);
            }
        }
    }
    if (query) {
        for (const key in query) {
            if (typeof query[key] === "string") {
                query[key] = (0, sanitize_html_1.default)(query[key]);
            }
        }
    }
    next();
};
exports.default = requestSanitizer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC1zYW5pdGl6ZXIubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9odG1sLXNhbml0aXplci5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQXlDO0FBR3pDLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ2pGLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDckIsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUN2QixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBRXRCLElBQUksSUFBSSxFQUFFO1FBQ1IsOERBQThEO1FBQzlELE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDakMsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7Z0JBQ3RCLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO29CQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBQSx1QkFBWSxFQUFDLElBQUksQ0FBQyxHQUFHLENBQVcsQ0FBQyxDQUFDO2lCQUMvQztxQkFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDeEMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUN6QjthQUNGO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BCO0lBRUQsSUFBSSxNQUFNLEVBQUU7UUFDVixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTtZQUN4QixJQUFJLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDbkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUEsdUJBQVksRUFBQyxNQUFNLENBQUMsR0FBRyxDQUFXLENBQUMsQ0FBQzthQUNuRDtTQUNGO0tBQ0Y7SUFFRCxJQUFJLEtBQUssRUFBRTtRQUNULEtBQUssTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO1lBQ3ZCLElBQUksT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUNsQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBQSx1QkFBWSxFQUFDLEtBQUssQ0FBQyxHQUFHLENBQVcsQ0FBQyxDQUFDO2FBQ2pEO1NBQ0Y7S0FDRjtJQUVELElBQUksRUFBRSxDQUFDO0FBQ1QsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsZ0JBQWdCLENBQUMifQ==