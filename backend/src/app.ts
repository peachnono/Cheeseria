import express, { Application } from 'express';
import { CheeseRepository as CheeseRepositoryClass } from './repository/cheeseRepository';
import { CheeseService as CheeseServiceClass } from './service/cheeseService';
import { CheeseRoutes } from './routes/cheeseRoutes';

// Create instances of the repository and service
const cheeseRepository = new CheeseRepositoryClass();
const cheeseService = new CheeseServiceClass(cheeseRepository);

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './documentation/swagger'; // Import Swagger options

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Create an Express app
const app: Application = express();

// Inject the cheeseService into the cheese routes
app.use('/api', CheeseRoutes(cheeseService));

// Middleware for Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
