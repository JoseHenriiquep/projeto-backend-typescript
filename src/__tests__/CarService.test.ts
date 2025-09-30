
import CarRepository from "../infraestructure/database/CarRepository";
import CarService from "../domain/services/CarService";
import { ViewCarDTO } from "../domain/dtos/CarDTO";
import { ObjectId } from "mongodb";
import { Car } from "../entities/Car";
import { Store } from "../entities/Store";

jest.mock('../infraestructure/database/CarRepository');

describe('CarService', () => {
  let carService: CarService;
  let carRepository: jest.Mocked<CarRepository>;

  const storeId = new ObjectId()
  const mockStore: Store = {
    _id: storeId,
    name: 'LojaTeste',
    email: 'lojateste@email.com',
    phone: '123456789',
  } as Store;

  const mockCars: Car[] = [
    { 
      brand: 'marca1', 
      model: 'modelo1', 
      year: 2025, 
      plate: 'PLACA1', 
      available: true,
      store: mockStore
    },
    {
      brand: 'marca2', 
      model: 'modelo2', 
      year: 2025, 
      plate: 'PLACA2', 
      available: true,
      store: mockStore
    }
  ];

  const mockCar: Car = { 
    brand: 'marca', 
    model: 'modelo', 
    year: 2025, 
    plate: 'RFT5J84',
    available: true,
    store: mockStore
  };

  beforeEach(() => {
    carRepository = new CarRepository() as jest.Mocked<CarRepository>;
    carService = new CarService(carRepository);

    jest.clearAllMocks();
  });

  it('Return all cars', async () => {
    carRepository.getCars.mockResolvedValue(mockCars);

    const cars = await carService.getAll();

    expect(carRepository.getCars).toHaveBeenCalledTimes(1);
    expect(cars).toEqual(mockCars);
  });

  it('Return car by Id', async () => {
    const validId = new ObjectId().toString();

    const mockCarDto: ViewCarDTO = {
      _id: new ObjectId(validId),
      brand: mockCar.brand,
      model: mockCar.model,
      year: mockCar.year,
      available: mockCar.available,
      store: mockCar.store
    }

    carRepository.getCarById.mockResolvedValue(mockCarDto);

    const car = await carService.getById(validId);

    expect(carRepository.getCarById).toHaveBeenLastCalledWith(validId);
    expect(car).toEqual(mockCarDto);
  });

  it('Add new car and return to new list', async () => {
    const newCar = new Car('marca3', 'modelo3', 2025, 'PLACA3', true, mockStore);

    const newCarList: Car[] = [
      ...mockCars,
      newCar
    ];

    carRepository.addCar.mockResolvedValue(newCarList);

    const result = await carService.add(storeId.toString(), newCar);

    expect(carRepository.addCar).toHaveBeenCalledTimes(1);
    expect(carRepository.addCar).toHaveBeenCalledWith(storeId.toString(), newCar);
    expect(result).toEqual(newCarList);
  });

  it('Remove the car by id', async () => {
    carRepository.removeCar.mockResolvedValue(true);

    const result = await carService.remove('1');

    expect(carRepository.removeCar).toHaveBeenCalledTimes(1);
    expect(carRepository.removeCar).toHaveBeenCalledWith('1');
    expect(result).toBe(true);
  });

  it('Update the car by id and return updated car', async () => {
    const updatedData = {
      brand: 'Honda', 
      model: 'Civic', 
      plate: 'EHY7O95', 
    }

    const updatedCar: Car = {
      ...mockCar,
      ...updatedData
    };

    carRepository.updateCar.mockResolvedValue(updatedCar);

    const result = await carService.update('1', updatedData);

    expect(carRepository.updateCar).toHaveBeenCalledTimes(1);
    expect(carRepository.updateCar).toHaveBeenCalledWith('1', updatedData);
    expect(result).toEqual(updatedCar)
  });
});