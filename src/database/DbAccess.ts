import path from "path";
import fs from 'fs';
import { DbType } from "../types/DbType";
import { CarType } from "../types/CarType";
import { Car } from "./car";

export default class DbAccess {
  public filePath: string;

  constructor(db: string = 'carDB.json'){
    this.filePath = path.join(__dirname, db)
  }

  private database(): DbType {
    const bd = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(bd);
  }

  private rewriteDb(updatedDb: DbType): boolean {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(updatedDb));
      return true;
    } catch (error) {
      return false;
    }
  }

  public getCars(): CarType[]{
    const bd = this.database();
    const cars = bd.cars;
    return cars;
  }

  public getCarById(id: number): CarType | undefined {
    const cars = this.getCars();
    return cars.find(car => car.id === id);
  }

  public addCar(car: Car): CarType[] {
    const cars = this.getCars();
    cars.push(
      { ...car }
    );
    const updatedDb = this.database();
    updatedDb.cars = cars;
    this.rewriteDb(updatedDb);
    return cars;
  }

  public updateCar(id: number, carUpdated: Partial<Car>): CarType | undefined {
    const cars = this.getCars();
    const index = cars.findIndex(car => car.id === id);
    if (index === -1) {
      return undefined;
    }
    cars[index] = {
      ...cars[index],
      ...carUpdated,
      id
    };
    const updatedDb = this.database();
    updatedDb.cars = cars;
    const rewriteDb = this.rewriteDb(updatedDb);
    return rewriteDb ? cars[index] : undefined;    
  }

  public removeCar(id: number): boolean {
    const cars = this.getCars();
    const index = cars.findIndex(car => car.id === id);
    if (index === -1) {
      return false;
    }
    cars.splice(index, 1);
    const updatedDb = this.database();
    updatedDb.cars = cars;
    return this.rewriteDb(updatedDb);
  }
}
