"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheeseRepository = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class CheeseRepository {
    constructor() {
        this.cheeses = [
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
    }
    // Create a new cheese
    createCheese(newCheese) {
        const existingCheese = this.cheeses.find((cheese) => cheese.id === newCheese.id);
        if (existingCheese) {
            throw new Error("Cheese with the same ID already exists");
        }
        this.cheeses.push(newCheese);
        return newCheese;
    }
    // Get all cheeses
    getAllCheeses() {
        return this.cheeses;
    }
    // Get cheese by ID
    getCheeseById(id) {
        const cheese = this.cheeses.find((cheese) => cheese.id === id);
        return cheese || null; // Return null instead of undefined
    }
    // Update an existing cheese
    updateCheese(updatedCheese) {
        const index = this.cheeses.findIndex((cheese) => cheese.id === updatedCheese.id);
        if (index === -1) {
            throw new Error("Cheese not found");
        }
        // Update the cheese at the found index
        this.cheeses[index] = updatedCheese;
        return updatedCheese;
    }
    // Delete an existing cheese by ID
    deleteCheese(id) {
        const index = this.cheeses.findIndex((cheese) => cheese.id === id);
        if (index === -1) {
            throw new Error("Cheese not found");
        }
        this.cheeses.splice(index, 1);
    }
}
exports.CheeseRepository = CheeseRepository;
