"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
exports.swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cheese API',
            version: '1.0.0',
            description: 'A simple API to manage users',
        },
        servers: [
            {
                url: 'http://localhost:5000', // Your server URL
            },
        ],
    },
    apis: [
        './src/routes/*.ts',
        './src/models/*.ts',
    ],
};
