import { CheeseRepository } from "../repository/cheeseRepository";
import { Cheese } from "../models/cheese";

/**
 * Service class for managing cheese-related operations.
 */
export class CheeseService {
    private cheeseRepository: CheeseRepository;

    /**
     * Creates an instance of CheeseService.
     * @param cheeseRepository - The repository instance for cheese data access.
     */
    constructor(cheeseRepository: CheeseRepository) {
        this.cheeseRepository = cheeseRepository;
    }

    /**
     * Retrieves all cheeses.
     * @returns A promise that resolves to an array of Cheese objects.
     */
    async getCheeses(): Promise<Cheese[]> {
        return this.cheeseRepository.getAllCheeses();
    }

    /**
     * Retrieves a single cheese by its ID.
     * @param id - The ID of the cheese to retrieve.
     * @returns A promise that resolves to a Cheese object or null if not found.
     */
    getCheese(id: number): Promise<Cheese | null> {
        return this.cheeseRepository.getCheeseById(id);
    }

    /**
     * Calculates the total cost for a given weight of cheese.
     * @param cheeseId - The ID of the cheese.
     * @param weightInKilos - The weight of the cheese in kilograms.
     * @returns A promise that resolves to the total cost.
     * @throws An error if the cheese is not found.
     */
    async calculateCheeseCost(cheeseId: number, weightInKilos: number): Promise<number> {
        const cheese = await this.cheeseRepository.getCheeseById(cheeseId); // Await the Promise

        if (!cheese) {
            throw new Error("Cheese not found");
        }

        return cheese.pricePerKilo * weightInKilos;
    }
}
 