import { ObjectId } from "mongodb";
import { Car } from "../../entities/Car";

export type ViewCarDTO = {
  _id: ObjectId,
  brand: string;
  model: string;
  year: number;
  available: boolean;
}

export type updateCarDTO = Partial<Car>