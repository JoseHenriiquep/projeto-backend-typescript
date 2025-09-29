import { Store } from "./Store";

export class Car {
  brand: string;
  model: string;
  year: number;
  plate: string;
  available: boolean;
  store?: Store;

  constructor(brand: string, model: string, year: number, plate: string, available: boolean, store?: Store){
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.plate = plate;
    this.available = available;
    this.store = store;
  }
}
