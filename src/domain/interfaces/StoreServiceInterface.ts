import { Store } from "../../entities/Store";
import { ViewStoreDTO } from "../dtos/StoreDTO";

export default interface StoreServiceInterface {
  getAll(): Promise<Store[] | undefined>;

  getById(id: string): Promise<ViewStoreDTO | undefined>;

  add(store: Store): Promise<Store[]>;

  update(id: string, storeData: Partial<Store>): Promise<Store | undefined>;

  remove(id: string): Promise<boolean>;
}