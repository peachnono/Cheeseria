import express, { Request, Response } from 'express';
import { CheeseService } from '../service/cheeseService'; 

export const CheeseRoutes = (cheeseService: CheeseService) => {
  const router = express.Router();

  // Get all cheeses
  router.get('/cheeses', (req: Request, res: Response) => {
    const cheeses = cheeseService.getCheeses();
    res.json(cheeses);
  });

  // Get cheese by ID
  router.get('/cheeses/:id', (req: Request, res: Response) => {
    const cheeseId = parseInt(req.params.id, 10);
    const cheese = cheeseService.getCheese(cheeseId);

    if (cheese) {
      res.json(cheese);
    } else {
      res.status(404).json({ message: 'Cheese not found' });
    }
  });

  // New route to calculate the cheese cost for a given weight (in kilograms)
  router.get('/cheeses/:id/cost/:weight', (req: Request, res: Response) => {
    const cheeseId = parseInt(req.params.id, 10);
    const weight = parseFloat(req.params.weight);

    if (isNaN(weight) || weight < 0) {
      return res.status(400).json({ message: 'Invalid weight' });
    }

    try {
      const totalCost = cheeseService.calculateCheeseCost(cheeseId, weight);
      res.json({ cheeseId, weight, totalCost });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  return router;
};
