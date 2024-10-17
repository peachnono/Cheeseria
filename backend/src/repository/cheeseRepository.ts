import { Cheese } from "../models/cheese"; // Import the Cheese interface

export class CheeseRepository {
  private cheeses: Cheese[] = [
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

  // Get all cheeses
  public getAllCheeses(): Cheese[] {
    return this.cheeses;
  }

  // Get cheese by ID
  public async getCheeseById(id: number): Promise<Cheese | null> {
    const cheese = this.cheeses.find((cheese) => cheese.id === id);
    return cheese || null; // Return null instead of undefined
  }
}
