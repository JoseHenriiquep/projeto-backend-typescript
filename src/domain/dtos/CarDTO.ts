import { ObjectId } from "mongodb";
import { Car } from "../../entities/Car";
import { Store } from "../../entities/Store";

export type ViewCarDTO = {
  _id: ObjectId,
  brand: string;
  model: string;
  year: number;
  available: boolean;
  store?: Store
}

export type updateCarDTO = Partial<Car>