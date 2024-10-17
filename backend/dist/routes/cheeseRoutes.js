"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheeseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const CheeseRoutes = (cheeseService) => {
    const router = express_1.default.Router();
    // Get all cheeses
    router.get('/cheeses', async (_, res) => {
        try {
            const cheeses = await cheeseService.getCheeses(); // Use async/await
            res.json(cheeses);
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to get cheeses' });
        }
    });
    // Get cheese by ID
    router.get('/cheeses/:id', async (req, res) => {
        const cheeseId = parseInt(req.params.id, 10);
        try {
            const cheese = await cheeseService.getCheese(cheeseId); // Use async/await
            if (cheese) {
                res.json(cheese);
            }
            else {
                res.status(404).json({ message: 'Cheese not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to get cheese' });
        }
    });
    // New route to calculate the cheese cost for a given weight (in kilograms)
    router.get('/cheeses/:id/cost/:weight', async (req, res) => {
        const cheeseId = parseInt(req.params.id, 10);
        const weight = parseFloat(req.params.weight);
        if (isNaN(weight) || weight < 0) {
            res.status(400).json({ message: 'Invalid weight' });
        }
        try {
            const totalCost = await cheeseService.calculateCheeseCost(cheeseId, weight); // Use async/await
            res.json({ cheeseId, weight, totalCost });
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    });
    return router;
};
exports.CheeseRoutes = CheeseRoutes;
