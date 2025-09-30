import StoreService from "../domain/services/StoreService";
import StoreRepository from "../infraestructure/database/StoreRepository";
import { Store } from "../entities/Store";
import { ObjectId } from "mongodb";
import CarRepository from "../infraestructure/database/CarRepository";

jest.mock('../infraestructure/database/CarRepository');
jest.mock('../infraestructure/database/StoreRepository');

describe('StoreService', () => {
  let storeService: StoreService;
  let storeRepository: jest.Mocked<StoreRepository>;

  const storeId = new ObjectId();
  const carId = new ObjectId();

  const mockStore1 = new Store('loja1', 'loja1@email.com', '123456789');
  const mockStore2 = new Store('loja2', 'loja2@email.com', '123456789');

  const mockCar = {
    _id: carId,
    brand: 'Honda',
    model: 'Civic',
    year: 2025,
    plate: 'ABC1234',
    available: true,
    store: storeId
  };

  const mockStores = [
    { ...mockStore1, _id: storeId, cars: [mockCar] },
    { ...mockStore2, _id: new ObjectId(), cars: [] }
  ]

  beforeEach(() => {
    storeRepository = new StoreRepository() as jest.Mocked<StoreRepository>;
    storeService = new StoreService(storeRepository);
  });

  it('Return all stores with cars', async () => {
    storeRepository.getStores.mockResolvedValue(mockStores);

    const stores = await storeService.getAll();

    expect(storeRepository.getStores).toHaveBeenCalledTimes(1);
    expect(stores).toEqual(mockStores);
  });

  it('Return store by Id with cars', async () => {
    storeRepository.getStoreById.mockResolvedValue(mockStores[0]);

    const store = await storeService.getById(storeId.toString());

    expect(storeRepository.getStoreById).toHaveBeenLastCalledWith(storeId.toString());
    expect(store).toEqual(mockStores[0]);
  });

  it('Add new store and return to new list', async () => {
    const newStore = new Store('loja3', 'loja3@email.com', '123456789');
    
    const newStoreList = [
      ...mockStores, 
      {
        ...newStore, _id: new ObjectId(), cars: []
      }
    ];

    storeRepository.addStore.mockResolvedValue(newStoreList);

    const result = await storeService.add(newStore);

    expect(storeRepository.addStore).toHaveBeenCalledTimes(1);
    expect(storeRepository.addStore).toHaveBeenCalledWith(newStore);
    expect(result).toEqual(newStoreList);
  });

  it('Update the store by Id and return updated store', async () => {
    const updatedData = {
      name: 'Lojão do amor', 
      email: 'lojaodoamor@email.com', 
      phone: '81912345678', 
    }

    const updatedStore = {
      ...mockStore1,
      ...updatedData, _id: storeId, cars: [mockCar]
    };

    storeRepository.updateStore.mockResolvedValue(updatedStore);

    const result = await storeService.update('1', updatedData);

    expect(storeRepository.updateStore).toHaveBeenCalledTimes(1);
    expect(storeRepository.updateStore).toHaveBeenCalledWith('1', updatedData);
    expect(result).toEqual(updatedStore)
  });

  it('Remove the store by Id and remove its cars ', async () => {
    storeRepository.getStoreById.mockResolvedValue(mockStores[0]);
    storeRepository.removeStore.mockResolvedValue(true);

    const result = await storeService.remove(storeId.toString());

    expect(storeRepository.removeStore).toHaveBeenCalledWith(storeId.toString());
    expect(result).toBe(true);
  });
})