export class Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  plate: string;
  available: boolean;

  constructor(brand: string, model: string, year: number, plate: string, available: boolean){
    this.id = Math.round(Math.random() * 100);
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.plate = plate;
    this.available = available;
  }
}

