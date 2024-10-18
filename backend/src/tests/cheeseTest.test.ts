import { CheeseService } from '../service/cheeseService';
import { CheeseRepository } from '../repository/cheeseRepository';
import { Cheese } from '../models/cheese';

jest.mock('../repository/cheeseRepository'); 

/**
 * Test suite for the CheeseService class.
 * This suite tests the various functionalities of the CheeseService, ensuring
 * correct behavior for creating, retrieving, updating, and deleting cheese
 * entries, as well as handling errors appropriately.
 */
describe('CheeseService', () => {
  let cheeseService: CheeseService;
  let cheeseRepository: jest.Mocked<CheeseRepository>;

  beforeEach(() => {
    cheeseRepository = new CheeseRepository() as jest.Mocked<CheeseRepository>;
    cheeseService = new CheeseService(cheeseRepository);
  });

  /**
   * Test creating a new cheese entry successfully.
   */
  test('createCheese - successfully creates a new cheese', () => {
    const newCheese: Cheese = { id: 6, name: 'St James', pricePerKilo: 80, colour: 'Yellow', picture: null };
    cheeseRepository.getCheeseById.mockReturnValue(null); // Simulate that cheese does not exist
    cheeseRepository.createCheese.mockReturnValue(newCheese); // Simulate successful creation

    const createdCheese = cheeseService.createCheese(newCheese);

    expect(createdCheese).toEqual(newCheese);
    expect(cheeseRepository.createCheese).toHaveBeenCalledWith(newCheese);
  });

  /**
   * Test creating a cheese entry that already exists.
   */
  test('createCheese - throws error when cheese already exists', () => {
    const existingCheese: Cheese = { id: 1, name: 'Abondance', pricePerKilo: 82, colour: 'Pale Yellow', picture: '/images/abondance.jpg' };
    cheeseRepository.getCheeseById.mockReturnValue(existingCheese); // Simulate that cheese already exists

    // Update the expected error message to match the actual one
    expect(() => cheeseService.createCheese(existingCheese)).toThrowError(
      'Failed to create cheese: Cheese with ID 1 already exists'
    );
  });

  /**
   * Test retrieving all cheese entries.
   */
  test('getCheeses - retrieves all cheeses with picture URLs', () => {
    const cheeses = [
      { id: 1, name: 'Abondance', pricePerKilo: 82, colour: 'Pale Yellow', picture: '/images/abondance.jpg' },
      { id: 2, name: 'Mimmolette', pricePerKilo: 88, colour: 'Orange', picture: '/images/mimmolette.jpg' },
    ];
    cheeseRepository.getAllCheeses.mockReturnValue(cheeses);

    const result = cheeseService.getCheeses();

    expect(result).toEqual(cheeses);
  });

  /**
   * Test retrieving a single cheese entry by ID.
   */
  test('getCheese - retrieves a single cheese with picture URL', () => {
    const cheese = { id: 1, name: 'St James', pricePerKilo: 80, colour: 'Yellow', picture: null };
    cheeseRepository.getCheeseById.mockReturnValue(cheese);

    const result = cheeseService.getCheese(1);

    expect(result).toEqual(cheese);
  });

  /**
   * Test retrieving a cheese entry that does not exist.
   */
  test('getCheese - returns null if cheese not found', () => {
    cheeseRepository.getCheeseById.mockReturnValue(null);

    const result = cheeseService.getCheese(999);

    expect(result).toBeNull();
  });

  /**
   * Test retrieving the price of a specific cheese.
   */
  test('getCheesePrice - retrieves the price of a cheese', () => {
    const cheese = { id: 1, name: 'St James', pricePerKilo: 80, colour: 'Yellow', picture: null };
    cheeseRepository.getCheeseById.mockReturnValue(cheese);

    const price = cheeseService.getCheesePrice(1);

    expect(price).toBe(80);
  });

  /**
   * Test retrieving the price of a cheese that does not exist.
   */
  test('getCheesePrice - throws error when cheese not found', () => {
    cheeseRepository.getCheeseById.mockReturnValue(null);

    expect(() => cheeseService.getCheesePrice(999)).toThrowError('Cheese not found');
  });

  /**
   * Test updating an existing cheese entry successfully.
   */
  test('updateCheese - successfully updates existing cheese', () => {
    const updatedCheese: Cheese = { id: 1, name: 'Updated St James', pricePerKilo: 55, colour: 'Yellow', picture: null };
    cheeseRepository.getCheeseById.mockReturnValue(updatedCheese); // Simulate existing cheese
    cheeseRepository.updateCheese.mockReturnValue(updatedCheese); // Simulate successful update

    const result = cheeseService.updateCheese(updatedCheese);

    expect(result).toEqual(updatedCheese);
    expect(cheeseRepository.updateCheese).toHaveBeenCalledWith(updatedCheese);
  });

  /**
   * Test updating a cheese entry that does not exist.
   */
  test('updateCheese - throws error when cheese not found', () => {
    const updatedCheese: Cheese = { id: 999, name: 'Non-existent Cheese', pricePerKilo: 0, colour: 'Unknown', picture: null };
    cheeseRepository.getCheeseById.mockReturnValue(null); // Simulate cheese not found

    expect(() => cheeseService.updateCheese(updatedCheese)).toThrowError('Cheese not found');
  });

  /**
   * Test retrieving the picture of a specific cheese.
   */
  test('getCheesePicture - retrieves cheese picture', () => {
    const cheese = { id: 1, name: 'St James', pricePerKilo: 80, colour: 'Yellow', picture: Buffer.from('dummyImageData') };
    cheeseRepository.getCheeseById.mockReturnValue(cheese);

    const picture = cheeseService.getCheesePicture(1);

    expect(picture).toBe('ZHVtbXlJbWFnZURhdGE=');
  });

  /**
   * Test retrieving the picture of a cheese that does not exist.
   */
  test('getCheesePicture - returns null if cheese or picture not found', () => {
    cheeseRepository.getCheeseById.mockReturnValue(null); // Cheese not found

    const result = cheeseService.getCheesePicture(999);

    expect(result).toBeNull();
  });

  /**
   * Test successfully deleting a cheese entry.
   */
  test('deleteCheese - successfully deletes a cheese', () => {
    cheeseRepository.deleteCheese.mockImplementation(() => { }); // Simulate successful deletion

    expect(() => cheeseService.deleteCheese(1)).not.toThrow();
    expect(cheeseRepository.deleteCheese).toHaveBeenCalledWith(1);
  });

  /**
   * Test calculating the total cost of a cheese for a given weight.
   */
  test('calculateCheeseCost - calculates the total cost for a given weight', () => {
    const cheese = { id: 1, name: 'St James', pricePerKilo: 80, colour: 'Yellow', picture: null };
    cheeseRepository.getCheeseById.mockReturnValue(cheese);

    const cost = cheeseService.calculateCheeseCost(1, 2); // 2 kilograms

    expect(cost).toBe(160);
  });

  /**
   * Test calculating the cost of a cheese that does not exist.
   */
  test('calculateCheeseCost - throws error when cheese not found', () => {
    cheeseRepository.getCheeseById.mockReturnValue(null);

    expect(() => cheeseService.calculateCheeseCost(999, 2)).toThrowError('Cheese not found');
  });
});
