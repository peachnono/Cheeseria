import express, { Application } from 'express';

// Import the CheeseRoutes, CheeseRepository and CheeseService classes
import { CheeseRepository as CheeseRepositoryClass } from './repository/cheeseRepository';
import { CheeseService as CheeseServiceClass } from './service/cheeseService';
import { CheeseRoutes } from './routes/cheeseRoutes';

// Create instances of the repository and service
const cheeseRepository = new CheeseRepositoryClass();
const cheeseService = new CheeseServiceClass(cheeseRepository);

// Import swaggerUi and swaggerDocument
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './documentation/swagger.json'; 
import path from 'path';

// Create an Express app
const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the cheeseService into the cheese routes
app.use('/api', CheeseRoutes(cheeseService));

// Serve the static Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve the frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
