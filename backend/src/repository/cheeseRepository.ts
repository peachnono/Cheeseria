import { Cheese } from "../models/cheese"; // Import the Cheese interface
import * as fs from 'fs';
import * as path from 'path';


export class CheeseRepository {
  private cheeses: Cheese[] = [
    {
      // Reference:
      // https://www.cheese.com/abondance/
      // https://deliss.com.au/collections/semi-hard-cheese/products/abondance-aop?variant=32246870147190
      id: 1,
      name: "Abondance",
      pricePerKilo: 82,
      colour: "Pale Yellow",
      picture: fs.existsSync(path.join(__dirname, '../images/abondance.png'))
          ? fs.readFileSync(path.join(__dirname, '../images/abondance.png'))
          : undefined 
    },
    {
      // Reference:
      // https://www.cheese.com/mimolette/
      // https://deliss.com.au/collections/cheese/products/mimolette?variant=31581928226934
      id: 2,
      name: "Mimolette",
      pricePerKilo: 88,
      colour: "Orange",
      picture: fs.existsSync(path.join(__dirname, '../images/mimmolette.jpg'))
      ? fs.readFileSync(path.join(__dirname, '../images/mimmolette.jpg'))
      : undefined 
    },
    {
      // Reference:
      // https://www.cheese.com/camembert/
      // https://deliss.com.au/collections/white-mould/products/camembert-le-fin-normand
      id: 3,
      name: "Camembert",
      pricePerKilo: 88,
      colour: "Pale Yellow",
      picture: fs.existsSync(path.join(__dirname, '../images/camembert.jpg'))
      ? fs.readFileSync(path.join(__dirname, '../images/camembert.jpg'))
      : undefined 
    },
    {
      // Reference:
      // https://www.cheese.com/camembert/
      // https://deliss.com.au/collections/raclette/products/saint-nectaire-aop-le-paillon?variant=29153533067382
      id: 4,
      name: "Saint Nectaire",
      pricePerKilo: 98,
      colour: "Ivory",
      picture: fs.existsSync(path.join(__dirname, '../images/saintNectaire.jpg'))
      ? fs.readFileSync(path.join(__dirname, '../images/saintNectaire.jpg'))
      : undefined 
    },
    {
      // Reference:
      // https://www.cheese.com/milawa-blue/
      // https://gippslandcheese.com.au/shop/cheese/blue-mould/milawa-blue/
      id: 5,
      name: "Milawa Blue",
      pricePerKilo: 85,
      colour: "Blue",
      picture: fs.existsSync(path.join(__dirname, '../images/milawaBlue.jpg'))
      ? fs.readFileSync(path.join(__dirname, '../images/milawaBlue.jpg'))
      : undefined 
    }
  ];

  // Create a new cheese
  public createCheese(newCheese: Cheese): Cheese {
    const existingCheese = this.cheeses.find(
      (cheese) => cheese.id === newCheese.id
    );

    if (existingCheese) {
      throw new Error("Cheese with the same ID already exists");
    }

    this.cheeses.push(newCheese);
    return newCheese;
  }

  // Get all cheeses
  public getAllCheeses(): Cheese[] {
    return this.cheeses;
  }

  // Get cheese by ID
  public getCheeseById(id: number): Cheese | null {
    const cheese = this.cheeses.find((cheese) => cheese.id === id);
    return cheese || null; // Return null instead of undefined
  }

  // Update an existing cheese
  public updateCheese(updatedCheese: Cheese): Cheese {
    const index = this.cheeses.findIndex(
      (cheese) => cheese.id === updatedCheese.id
    );

    if (index === -1) {
      throw new Error("Cheese not found");
    }

    // Update the cheese at the found index
    this.cheeses[index] = updatedCheese;
    return updatedCheese;
  }

  // Delete an existing cheese by ID
  public deleteCheese(id: number): void {
    const index = this.cheeses.findIndex((cheese) => cheese.id === id);

    if (index === -1) {
      throw new Error("Cheese not found");
    }

    this.cheeses.splice(index, 1); 
  }

}