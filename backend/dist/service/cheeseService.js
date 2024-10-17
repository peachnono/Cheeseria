"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheeseService = void 0;
class CheeseService {
    constructor(cheeseRepository) {
        this.cheeseRepository = cheeseRepository;
    }
    // Get all cheeses
    async getCheeses() {
        return this.cheeseRepository.getAllCheeses();
    }
    // Get a single cheese by ID
    getCheese(id) {
        return this.cheeseRepository.getCheeseById(id);
    }
    // New method to calculate total cost for a given weight
    async calculateCheeseCost(cheeseId, weightInKilos) {
        const cheese = await this.cheeseRepository.getCheeseById(cheeseId); // Await the Promise
        if (!cheese) {
            throw new Error("Cheese not found");
        }
        return cheese.pricePerKilo * weightInKilos;
    }
}
exports.CheeseService = CheeseService;
