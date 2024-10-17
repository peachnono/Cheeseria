
import { Options as SwaggerOptions } from 'swagger-jsdoc';

export const swaggerOptions: SwaggerOptions = {
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
    './src/models/*.ts',],
};
