"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheeseService = void 0;
/**
 * Service class for managing cheese-related operations.
 */
class CheeseService {
    /**
     * Creates an instance of CheeseService.
     * @param cheeseRepository - The repository instance for cheese data access.
     */
    constructor(cheeseRepository) {
        this.cheeseRepository = cheeseRepository;
    }
    /**
     * Creates a new cheese.
     * @param cheese - The new cheese object to create.
     * @returns A promise that resolves to the newly created cheese.
     * @throws An error if a cheese with the same ID already exists.
     */
    async createCheese(cheese) {
        try {
            return await this.cheeseRepository.createCheese(cheese);
        }
        catch (error) {
            throw new Error(`Failed to create cheese: Cheese with ID ${cheese.id} already exists`);
        }
    }
    // Get all cheeses with Base64-encoded pictures
    getCheeses() {
        return this.cheeseRepository.getAllCheeses().map(cheese => ({
            ...cheese,
            picture: cheese.picture
                ? `/images/${cheese.name.toLowerCase().replace(' ', '_')}.jpg` // Generate a URL based on the cheese name
                : null // Return null if no picture
        }));
    }
    // Get a single cheese by ID
    async getCheese(id) {
        const cheese = await this.cheeseRepository.getCheeseById(id);
        return cheese
            ? {
                ...cheese,
                picture: cheese.picture
                    ? `/images/${cheese.name.toLowerCase().replace(' ', '_')}.jpg` // Generate a URL for the image
                    : null
            }
            : null;
    }
    /**
     * Retrieves the price of a cheese by its ID.
     * @param id - The ID of the cheese to retrieve the price for.
     * @returns A promise that resolves to the price per kilo of the cheese.
     * @throws An error if the cheese is not found.
     */
    async getCheesePrice(id) {
        const cheese = await this.cheeseRepository.getCheeseById(id);
        if (!cheese) {
            throw new Error("Cheese not found");
        }
        return cheese.pricePerKilo;
    }
    /**
     * Updates an existing cheese with new data.
     * @param cheese - The cheese object containing updated information.
     * @returns A promise that resolves to the updated cheese.
     * @throws An error if the cheese does not exist.
     */
    async updateCheese(cheese) {
        const existingCheese = await this.cheeseRepository.getCheeseById(cheese.id);
        if (!existingCheese) {
            throw new Error("Cheese not found");
        }
        // Update the cheese in the repository
        return this.cheeseRepository.updateCheese(cheese);
    }
    /**
     * Retrieves the picture of a cheese by its ID.
     * @param id - The ID of the cheese to retrieve the picture for.
     * @returns A promise that resolves to the picture buffer or null if not found.
     */
    async getCheesePicture(id) {
        const cheese = await this.cheeseRepository.getCheeseById(id);
        if (!cheese || !cheese.picture) {
            return null; // Return null if no cheese or picture found
        }
        // If the picture is a Buffer, return it as a Base64-encoded string
        if (Buffer.isBuffer(cheese.picture)) {
            return cheese.picture.toString('base64');
        }
        // If the picture is already a string, return it directly
        return cheese.picture;
    }
    /**
     * Deletes a cheese by its ID.
     * @param id - The ID of the cheese to delete.
     * @returns A promise that resolves when the cheese is deleted.
     * @throws An error if the cheese is not found.
     */
    async deleteCheese(id) {
        await this.cheeseRepository.deleteCheese(id);
    }
    /**
     * Calculates the total cost for a given weight of cheese.
     * @param cheeseId - The ID of the cheese.
     * @param weightInKilos - The weight of the cheese in kilograms.
     * @returns A promise that resolves to the total cost.
     * @throws An error if the cheese is not found.
     */
    async calculateCheeseCost(cheeseId, weightInKilos) {
        const cheese = await this.cheeseRepository.getCheeseById(cheeseId); // Await the Promise
        if (!cheese) {
            throw new Error("Cheese not found");
        }
        return cheese.pricePerKilo * weightInKilos;
    }
}
exports.CheeseService = CheeseService;
