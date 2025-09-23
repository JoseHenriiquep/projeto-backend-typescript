import { Car } from "../entities/car";
import DbAccess from "../infraestructure/database/DbAccess";
import { CarDTO, ViewCarDTO } from "../types/CarDTO";
import { CarType } from "../infraestructure/database/CarType";

export default class CarService {
  private readonly dbAccess: DbAccess;
  constructor(dbAccess: DbAccess){
    this.dbAccess = dbAccess;
  }

  getAll(): CarType[] | undefined {
    const cars = this.dbAccess.getCars();
    if (!cars) return undefined;
    return cars;
  }

  getById(id: number): ViewCarDTO | undefined {
    const car = this.dbAccess.getCarById(+id);
    if (!car) return undefined 
    const carDto: ViewCarDTO = {
      id: car.id,
      brand: car.brand,
      model: car.model,
      year: car.year,
      available: car.available
    };
    return carDto;
  }

  add(car: Car): CarType[] {
    return this.dbAccess.addCar(car);
  }

  update(id: number, carUpdated: Partial<Car>): CarType | undefined {
    const newCar = this.dbAccess.updateCar(id, carUpdated)
    if (!newCar) return undefined
    return newCar;
  }

  remove(id: number): boolean {
    const removedCar = this.dbAccess.removeCar(+id);
    if (!removedCar) return false;
    return removedCar;
  }
}