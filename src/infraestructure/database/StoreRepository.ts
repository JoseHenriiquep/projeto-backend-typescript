import { injectable } from "inversify";

import StoreRepositoryInterface from "../../domain/interfaces/StoreRepositoryInterface";
import { ViewStoreDTO } from "../../domain/dtos/StoreDTO";
import { Store } from "../../entities/Store";
import { StoreModel } from "./StoreModel";

@injectable()
export default class StoreRepository implements StoreRepositoryInterface{
  constructor(){}
  async getStores(): Promise<Store[]> {
    const stores: Store[] = await StoreModel.find().populate('cars');
    return stores;
  }
  async getStoreById(id: string): Promise<ViewStoreDTO | undefined> {
    const store = await StoreModel.findById({ _id: id }).populate('cars');
    if (!store) return undefined;
    return store;  
  }
  async addStore(store: Store): Promise<Store[]> {
    await StoreModel.create(store);
    const stores = await StoreModel.find();
    return stores;  
  }
  async updateStore(id: string, storeData: Partial<Store>): Promise<Store | undefined> {
    const updatedStore = await StoreModel.findByIdAndUpdate(id, storeData,  { new: true }).populate('cars');
    return updatedStore ? updatedStore.toObject() : undefined;
  }
  async removeStore(id: string): Promise<boolean> {
    return !!(await StoreModel.findByIdAndDelete({ _id: id }));
  }
}