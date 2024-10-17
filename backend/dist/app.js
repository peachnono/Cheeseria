"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const express_1 = __importDefault(require("express"));
// Import the CheeseRoutes, CheeseRepository and CheeseService classes
const cheeseRepository_1 = require("./repository/cheeseRepository");
const cheeseService_1 = require("./service/cheeseService");
const cheeseRoutes_1 = require("./routes/cheeseRoutes");
// Create instances of the repository and service
const cheeseRepository = new cheeseRepository_1.CheeseRepository();
const cheeseService = new cheeseService_1.CheeseService(cheeseRepository);
// Import swaggerUi and swaggerDocument
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./documentation/swagger.json"));
const path_1 = __importDefault(require("path"));
// Create an Express app
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Use the cheeseService into the cheese routes
app.use('/api', (0, cheeseRoutes_1.CheeseRoutes)(cheeseService));
// Serve the static Swagger documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Serve the frontend
app.use(express_1.default.static(path_1.default.join(__dirname, '../frontend/build')));
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
