"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheeseRepository = void 0;
class CheeseRepository {
    constructor() {
        this.cheeses = [
            {
                id: 1,
                name: "Cheddar",
                pricePerKilo: 15,
                colour: "Yellow",
                //   picture: Buffer.from("sampleImage1", "base64")
            },
            {
                id: 2,
                name: "Brie",
                pricePerKilo: 18,
                colour: "White",
                //   picture: Buffer.from("sampleImage2", "base64")
            }
        ];
    }
    // Get all cheeses
    getAllCheeses() {
        return this.cheeses;
    }
    // Get cheese by ID
    async getCheeseById(id) {
        const cheese = this.cheeses.find((cheese) => cheese.id === id);
        return cheese || null; // Return null instead of undefined
    }
}
exports.CheeseRepository = CheeseRepository;
