import { Car } from "../../entities/Car";
import { ViewCarDTO } from "../dtos/CarDTO";

export default interface CarServiceInterface {
  getAll(): Promise<Car[] | undefined>;

  getById(id: string): Promise<ViewCarDTO | undefined>;

  add(storeId: string, car: Car): Promise<Car[]>;

  update(id: string, carUpdated: Partial<Car>): Promise<Car | undefined>;

  remove(id: string): Promise<boolean>;
}