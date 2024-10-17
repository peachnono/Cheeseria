/**
 * Represents a type of cheese with its properties.
 * 
 * @interface Cheese
 * @property {number} id - The unique identifier for the cheese.
 * @property {string} name - The name of the cheese.
 * @property {number} pricePerKilo - The price of the cheese per kilogram.
 * @property {string} colour - The colour of the cheese.
 * // @property {Buffer} picture - The picture of the cheese (commented out).
 */
export interface Cheese {
    id: number;
    name: string;
    pricePerKilo: number;
    colour: string;
    // picture: Buffer;
}