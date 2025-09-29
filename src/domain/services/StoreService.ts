import { inject, injectable } from "inversify";
import 'reflect-metadata';
import StoreServiceInterface from "../interfaces/StoreServiceInterface";
import StoreRepository from "../../infraestructure/database/StoreRepository";
import { Store } from "../../entities/Store";
import { ViewStoreDTO } from "../dtos/StoreDTO";

@injectable()
export default class StoreService implements StoreServiceInterface {
  private readonly storeRepository: StoreRepository;

  constructor(
    @inject('StoreRepository')
    storeRepository: StoreRepository
  ){
    this.storeRepository = storeRepository;
  }

  async getAll(): Promise<Store[]> {
    const stores: Store[] | undefined = await this.storeRepository.getStores();
    return stores;
  }

  async getById(id: string): Promise<ViewStoreDTO | undefined> {
    const storeDto: ViewStoreDTO | undefined = await this.storeRepository.getStoreById(id);
    if (!storeDto) return undefined 
    return storeDto;
  }

  async add(store: Store): Promise<Store[]> {
    return await this.storeRepository.addStore(store);
  }

  async update(id: string, storeData: Partial<Store>): Promise<Store | undefined> {
    const updatedStore = await this.storeRepository.updateStore(id, storeData)
    return updatedStore ?? undefined;
  }

  async remove(id: string): Promise<boolean> {
    const removedStore = await this.storeRepository.removeStore(id);
    return removedStore ?? undefined;
  }
}