import { Car } from "../../entities/Car";
import {  ViewCarDTO } from "../dtos/CarDTO";

export default interface CarRepositoryInterface {
  getCars(): Promise<Car[]>;

  getCarById(id: string): Promise<ViewCarDTO | undefined>;

  addCar(storeId: string, car: Car): Promise<Car[]>;

  updateCar(id: string, carUpdated: Partial<Car>): Promise<Car | undefined>;

  removeCar(id: string): Promise<boolean>;
}