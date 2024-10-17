import { CheeseRepository } from "../repository/cheeseRepository";
import { Cheese } from "../models/cheese";

export class CheeseService {
  private cheeseRepository: CheeseRepository;

  constructor(cheeseRepository: CheeseRepository) {
    this.cheeseRepository = cheeseRepository;
  }

  // Get all cheeses
  async getCheeses(): Promise<Cheese[]> {
    return this.cheeseRepository.getAllCheeses();
  }

  // Get a single cheese by ID
  getCheese(id: number): Promise<Cheese | null> {
    return this.cheeseRepository.getCheeseById(id);
  }

  // New method to calculate total cost for a given weight
  async calculateCheeseCost(cheeseId: number, weightInKilos: number): Promise<number> {
    const cheese = await this.cheeseRepository.getCheeseById(cheeseId); // Await the Promise

    if (!cheese) {
      throw new Error("Cheese not found");
    }

    return cheese.pricePerKilo * weightInKilos;
  }
}
