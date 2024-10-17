"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheeseRoutes = void 0;
const express_1 = __importDefault(require("express"));
/**
 * Defines the routes for the application.
 *
 * @param cheeseService - The service to handle cheese operations.
 * @returns The router with defined cheese routes.
 *
 * @remarks
 * This function sets up the following routes:
 * Create a new cheese: POST /cheeses
 * - `POST /cheeses`: Creates a new cheese.
 * Read cheese data:
 * - `GET /cheeses`: Retrieves all cheeses.
 * - `GET /cheeses/:id`: Retrieves a specific cheese by its ID.
 * - `GET /cheeses/:id/price`: Retrieves a specific cheese's price.
 * - `GET /cheeses/:id/picture`: Retrieves a specific cheese's picture.
 * - `GET /cheeses/:id/cost/:weight`: Calculates the cost of a specific cheese for a given weight.
 * Update cheese data:
 * - `PUT /cheeses/:id`: Updates an existing cheese by ID.
 * Delete cheese data:
 * - `DELETE /cheeses/:id`: Deletes a cheese by ID.
 *
 */
const CheeseRoutes = (cheeseService) => {
    const router = express_1.default.Router();
    // Create a new cheese
    router.post("/cheeses", (req, res) => {
        const newCheese = req.body;
        try {
            const createdCheese = cheeseService.createCheese(newCheese);
            res.status(201).json(createdCheese);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
    // Get all cheeses
    router.get("/cheeses", (_, res) => {
        try {
            const cheeses = cheeseService.getCheeses();
            res.json(cheeses);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to get cheeses" });
        }
    });
    // Get cheese by ID
    router.get("/cheeses/:id", (req, res) => {
        const cheeseId = parseInt(req.params.id, 10);
        try {
            const cheese = cheeseService.getCheese(cheeseId);
            if (cheese) {
                res.json(cheese);
            }
            else {
                res.status(404).json({ message: "Cheese not found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Failed to get cheese" });
        }
    });
    // Get cheese price by ID
    router.get("/cheeses/:id/price", (req, res) => {
        const cheeseId = parseInt(req.params.id, 10);
        try {
            const price = cheeseService.getCheesePrice(cheeseId);
            if (price !== null) {
                res.json({ cheeseId, price });
            }
            else {
                res.status(404).json({ message: "Cheese not found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Failed to get cheese price" });
        }
    });
    // Get cheese picture by ID
    router.get("/cheeses/:id/picture", (req, res) => {
        const cheeseId = parseInt(req.params.id, 10);
        try {
            const picture = cheeseService.getCheesePicture(cheeseId);
            if (picture) {
                res.set("Content-Type", "image/jpeg"); // Adjust MIME type if necessary
                res.send(picture);
            }
            else {
                res.status(404).json({ message: "Cheese picture not found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Failed to get cheese picture" });
        }
    });
    // Calculate the cheese cost for a given weight (in kilograms)
    router.get("/cheeses/:id/cost/:weight", (req, res) => {
        const cheeseId = parseInt(req.params.id, 10);
        const weight = parseFloat(req.params.weight);
        if (isNaN(weight) || weight < 0) {
            res.status(400).json({ message: "Invalid weight" });
            return;
        }
        try {
            const totalCost = cheeseService.calculateCheeseCost(cheeseId, weight);
            res.json({ cheeseId, weight, totalCost });
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    });
    // Update an existing cheese by ID
    router.put("/cheeses/:id", (req, res) => {
        const cheeseId = parseInt(req.params.id, 10);
        const updatedCheese = { ...req.body, id: cheeseId };
        try {
            const updated = cheeseService.updateCheese(updatedCheese);
            res.json(updated);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    });
    // Delete a cheese by ID
    router.delete("/cheeses/:id", (req, res) => {
        const cheeseId = parseInt(req.params.id, 10);
        try {
            cheeseService.deleteCheese(cheeseId);
            res.status(204).send(); // No content
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    });
    return router;
};
exports.CheeseRoutes = CheeseRoutes;
