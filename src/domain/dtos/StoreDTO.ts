import { ObjectId } from "mongodb";
import { Store } from "../../entities/Store";

export type ViewStoreDTO = {
  _id: ObjectId,
  name: string,
  email: string,
  phone: string
}

export type updateStoreDTO = Partial<Store>