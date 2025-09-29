import { Request, Response, Router } from "express";
import { body, param, validationResult } from "express-validator";
import { inject, injectable } from "inversify";
import 'reflect-metadata';
import StoreServiceInterface from "../../domain/interfaces/StoreServiceInterface";
import { Store } from "../../entities/Store";
import { updateStoreDTO } from "../../domain/dtos/StoreDTO";

@injectable()
class StoreController {
  private readonly storeService: StoreServiceInterface
  public router: Router = Router();

  constructor(
    @inject('StoreService')
    storeService: StoreServiceInterface,
  ){
    this.storeService = storeService;
    this.routes();
  }

  public routes() {
    this.router.get('/', this.getStores.bind(this));
    this.router.get('/:id', [
      param('id').notEmpty().isString().withMessage('O id deve ser uma string')
    ], this.getStoreById.bind(this));
    this.router.post('/',  [
      body('name')
        .exists().withMessage('O campo name é obigatorio!')
        .isString().withMessage('O campo name deve ser uma string!'),
      body('email')
        .exists().withMessage('O campo email é obigatorio!')
        .isString().withMessage('O campo email deve ser uma string!'),
      body('phone')
        .exists().withMessage('O campo phone é obigatorio!')
        .isString().withMessage('O campo phone deve ser uma string!'),
    ], this.addStore.bind(this));
    this.router.patch('/:id', [
      param('id').notEmpty().isString().withMessage('O id deve ser uma string')
    ], this.updateStore.bind(this));
    this.router.delete('/:id', [
      param('id').notEmpty().isString().withMessage('O id deve ser uma string')
    ], this.removeStore.bind(this));
  }

  public async getStores(req: Request, res: Response) {
    try {
      const stores = await this.storeService.getAll();
      if (stores?.length == 0) {
        return res.status(404).json({ msg: 'Ainda não existem lojas disponíveis.' })
      }

      return res.status(200).json(stores);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Erro interno do servidor: ' + error })
    }
  }

  public async getStoreById(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const id = req.params.id;

      const storeDto = await this.storeService.getById(id);

      if (!storeDto) return res.status(404).json({ msg: 'Loja não encontrada' });

      return res.status(200).json(storeDto);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Erro interno do servidor: ' + error })
    }
  }

  public async addStore(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const storeData: Store = req.body;

      const store = new Store(
        storeData.name,
        storeData.email,
        storeData.phone,
      )

      const stores = await this.storeService.add(store);

      return res.status(201).json(stores);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Erro interno do servidor: ' + error })
    }
  }

  public async updateStore(req: Request, res: Response){
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const id = req.params.id;
      const store = await this.storeService.getById(id); 

      if (!store) return res.status(404).json({ msg: 'Loja não encontrada' });

      const storeData: updateStoreDTO = req.body;
      
      const newStore = await this.storeService.update(id, storeData);

      return res.status(200).json(newStore);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Erro interno do servidor: ' + error })
    }
  }

  public async removeStore(req: Request, res: Response){
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const id = req.params.id;

      const store = await this.storeService.getById(id);

      if (!store) return res.status(404).json({ msg: 'Loja não encontrada' })

      await this.storeService.remove(id);
      const stores = await this.storeService.getAll();
      return res.status(200).json(stores);
      
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Erro interno do servidor: ' + error })
    }
  }
}

export default StoreController;