import { Car } from "../entities/car";
import DbAccess from "../infraestructure/database/DbAccess";
import CarService from "../services/CarService";
import { CarType } from "../infraestructure/database/CarType";

jest.mock('../database/DbAccess');

describe('CarService', () => {
  let carService: CarService;
  let dbAccess: jest.Mocked<DbAccess>;

  describe('Return cars', () => {
    beforeEach(() => {
      dbAccess = new DbAccess() as jest.Mocked<DbAccess>;
      carService = new CarService(dbAccess);
    })

    it('Return all cars', () => {
      const mockCars: CarType[] = [
        { 
          id: 1, 
          brand: 'marca1', 
          model: 'modelo1', 
          year: 2025, 
          plate: 'PLACA1', 
          available: true 
        },
        {
          id: 2, 
          brand: 'marca2', 
          model: 'modelo2', 
          year: 2025, 
          plate: 'PLACA2', 
          available: true 
        }
      ]

      dbAccess.getCars.mockReturnValue(mockCars);

      const cars = carService.getAll();

      expect(dbAccess.getCars).toHaveBeenCalledTimes(1);
      expect(cars).toEqual(mockCars);
    })

    it('Return car by Id', () => {
      const mockCar: CarType = { 
        id: 1, 
        brand: 'marca', 
        model: 'modelo', 
        year: 2025, 
        plate: 'QYL9C', 
        available: true 
      };

      dbAccess.getCarById.mockReturnValue(mockCar);

      const car = carService.getById(1);

      expect(dbAccess.getCarById).toHaveBeenLastCalledWith(1);
      expect(car).toEqual({
        id: 1, 
        brand: 'marca', 
        model: 'modelo', 
        year: 2025, 
        available: true 
      });
    })
  })

  describe('Add new Car', () => {
    beforeEach(() => {
      dbAccess = new DbAccess() as jest.Mocked<DbAccess>;
      carService = new CarService(dbAccess);
    })
    it('Add new car and return to new list', () => {
      const newCar = new Car('marca3', 'modelo3', 2025, 'PLACA3', true);

      const mockCars: CarType[] = [
        { 
          id: 1, 
          brand: 'marca1', 
          model: 'modelo1', 
          year: 2025, 
          plate: 'PLACA1', 
          available: true 
        },
        {
          id: 2, 
          brand: 'marca2', 
          model: 'modelo2', 
          year: 2025, 
          plate: 'PLACA2', 
          available: true 
        },
        newCar
      ]

      dbAccess.addCar.mockReturnValue(mockCars);

      const result = carService.add(newCar);

      expect(dbAccess.addCar).toHaveBeenCalledTimes(1);
      expect(dbAccess.addCar).toHaveBeenCalledWith(newCar);
      expect(result).toEqual(mockCars);
    })
  })

  describe('Remove car', () => {
    beforeEach(() => {
      dbAccess = new DbAccess() as jest.Mocked<DbAccess>;
      carService = new CarService(dbAccess);
    })

    it('Remove the car by id', () => {
      dbAccess.removeCar.mockReturnValue(true);

      const result = carService.remove(1);

      expect(dbAccess.removeCar).toHaveBeenCalledTimes(1);
      expect(dbAccess.removeCar).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    })

  })

  describe('Update car', () => {
    beforeEach(() => {
      dbAccess = new DbAccess() as jest.Mocked<DbAccess>;
      carService = new CarService(dbAccess);
    })
    it('Update the car by id and return updated car', () => {
      const mockCar: CarType = 
        { 
          id: 1, 
          brand: 'marca1', 
          model: 'modelo1', 
          year: 2025, 
          plate: 'PLACA1', 
          available: true 
        }

      const updatedData = {
        brand: 'Honda', 
        model: 'Civic', 
        plate: 'EHY7O95', 
      }

      const updatedCar: CarType = {
        ...mockCar,
        ...updatedData
      };

      dbAccess.updateCar.mockReturnValue(updatedCar);

      const result = carService.update(1, updatedData);

      expect(dbAccess.updateCar).toHaveBeenCalledTimes(1);
      expect(dbAccess.updateCar).toHaveBeenCalledWith(1, updatedData);
      expect(result).toEqual(updatedCar)
    })
  })
})