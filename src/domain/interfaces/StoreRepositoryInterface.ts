import { Store } from "../../entities/Store";
import { ViewStoreDTO } from "../dtos/StoreDTO";

export default interface StoreRepositoryInterface {
  getStores(): Promise<Store[]>;

  getStoreById(id: string): Promise<ViewStoreDTO | undefined>;

  addStore(store: Store): Promise<Store[]>;

  updateStore(id: string, storeData: Partial<Store>): Promise<Store | undefined>;

  removeStore(id: string): Promise<boolean>;
}