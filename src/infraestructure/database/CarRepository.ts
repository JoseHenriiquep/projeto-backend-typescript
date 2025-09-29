import { injectable } from "inversify";
import { ViewCarDTO } from "../../domain/dtos/CarDTO";
import CarRepositoryInterface from "../../domain/interfaces/CarRepositoryInterface";
import { Car } from "../../entities/Car";
import { CarModel } from "./CarModel";

@injectable()
export default class CarRepository implements CarRepositoryInterface{
  constructor(){}

  async getCars(): Promise<Car[]> {
    const cars: Car[] = await CarModel.find().populate('store');
    return cars;
  }
  async getCarById(id: string): Promise<ViewCarDTO | undefined> {
    const car = await CarModel.findById({ _id: id }).populate('store');
    if (!car) return undefined;
    return car;
  }
  async addCar(storeId: string, car: Car): Promise<Car[]> {
    await CarModel.create({
      ...car,
      store: storeId
    });
    const cars = await CarModel.find();
    return cars;
  }
  async updateCar(id: string, carData: Partial<Car>): Promise<Car | undefined> {
    const updatedCar = await CarModel.findByIdAndUpdate(id, carData,  { new: true }).populate('store');
    return updatedCar ? updatedCar.toObject() : undefined;
  }
  async removeCar(id: string): Promise<boolean> {
    return !!(await CarModel.findByIdAndDelete({ _id: id }));
  }
}