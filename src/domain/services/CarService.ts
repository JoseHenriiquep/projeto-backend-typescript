import { Car } from "../../entities/Car";
import CarRepository from "../../infraestructure/database/CarRepository";
import { ViewCarDTO } from "../../domain/dtos/CarDTO";
import { inject, injectable } from "inversify";
import 'reflect-metadata';
import CarServiceInterface from "../interfaces/CarServiceInterface";

@injectable()
export default class CarService implements CarServiceInterface {
  private readonly carRepository: CarRepository;

  constructor(
    @inject('CarRepository')
    carRepository: CarRepository
  ){
    this.carRepository = carRepository;
  }

  async getAll(): Promise<Car[]> {
    const cars: Car[] | undefined = await this.carRepository.getCars();
    return cars;
  }

  async getById(id: string): Promise<ViewCarDTO | undefined> {
    const carDto: ViewCarDTO | undefined = await this.carRepository.getCarById(id);
    if (!carDto) return undefined 
    return carDto;
  }

  async add(storeId: string, car: Car): Promise<Car[]> {
    return await this.carRepository.addCar(storeId, car);
  }

  async update(id: string, carData: Partial<Car>): Promise<Car | undefined> {
    const updatedCar = await this.carRepository.updateCar(id, carData)
    return updatedCar ?? undefined;
  }

  async remove(id: string): Promise<boolean> {
    const removedCar = await this.carRepository.removeCar(id);
    return removedCar ?? undefined;
  }
}