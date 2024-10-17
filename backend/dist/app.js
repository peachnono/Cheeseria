"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cheeseRepository_1 = require("./repository/cheeseRepository");
const cheeseService_1 = require("./service/cheeseService");
const cheeseRoutes_1 = require("./routes/cheeseRoutes");
// Create instances of the repository and service
const cheeseRepository = new cheeseRepository_1.CheeseRepository();
const cheeseService = new cheeseService_1.CheeseService(cheeseRepository);
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./documentation/swagger");
const swaggerDocs = (0, swagger_jsdoc_1.default)(swagger_1.swaggerOptions);
// Create an Express app
const app = (0, express_1.default)();
// Inject the cheeseService into the cheese routes
app.use('/api', (0, cheeseRoutes_1.CheeseRoutes)(cheeseService));
// Middleware for Swagger
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
