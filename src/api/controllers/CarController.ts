import { Request, Response, Router } from "express";
import { Car } from "../../entities/Car";
import { updateCarDTO } from "../../domain/dtos/CarDTO";
import { body, param, validationResult } from "express-validator";
import { inject, injectable } from "inversify";
import 'reflect-metadata';
import CarServiceInterface from "../../domain/interfaces/CarServiceInterface";

@injectable()
class CarController {
  private readonly carService: CarServiceInterface
  public router: Router = Router();

  constructor(
    @inject('CarService')
    carService: CarServiceInterface,
  ){
    this.carService = carService;
    this.routes();
  }

  public routes() {
    this.router.get('/', this.getCars.bind(this));
    this.router.get('/:id', [
      param('id').notEmpty().isString().withMessage('O id deve ser uma string')
    ], this.getCarById.bind(this));
    this.router.post('/:id',  [
      param('id').notEmpty().isString().withMessage('O id deve ser uma string'),
      body('brand')
        .exists().withMessage('O campo brand é obigatorio!')
        .isString().withMessage('O campo brand deve ser uma string!'),
      body('model')
        .exists().withMessage('O campo model é obigatorio!')
        .isString().withMessage('O campo model deve ser uma string!'),
      body('year')
        .exists().withMessage('O campo year é obigatorio!')
        .custom((value) => {
          if (typeof value !== 'number') {
            throw new Error('O campo year deve ser um number!');
          }
          return true;
        }),
      body('plate')
        .exists().withMessage('O campo plate é obigatorio!')
        .isString().withMessage('O campo plate deve ser uma string!'),
      body('available')
        .exists().withMessage('O campo available é obigatorio!')
        .custom((value) => {
          if (typeof value !== 'boolean') {
            throw new Error('O campo ativo deve ser um boolean literal (true ou false)!');
          }
          return true;
        })
    ], this.addCar.bind(this));
    this.router.patch('/:id', [
      param('id').notEmpty().isString().withMessage('O id deve ser uma string')
    ], this.updateCar.bind(this));
    this.router.delete('/:id', [
      param('id').notEmpty().isString().withMessage('O id deve ser uma string')
    ], this.removeCar.bind(this));
  }

  public async getCars(req: Request, res: Response) {
    try {
      const cars = await this.carService.getAll();
      if (cars?.length == 0) {
        return res.status(404).json({ msg: 'Ainda não existem carros disponíveis.' })
      }

      return res.status(200).json(cars);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Erro interno do servidor: ' + error })
    }
  }

  public async getCarById(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const id = req.params.id;

      const car = await this.carService.getById(id);

      if (!car) return res.status(404).json({ msg: 'Carro não encontrado' });

      return res.status(200).json(car);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Erro interno do servidor: ' + error })
    }
  }

  public async addCar(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const storeId = req.params.id;
      const carData: Car = req.body;

      const car = new Car(
        carData.brand,
        carData.model,
        carData.year,
        carData.plate,
        carData.available,
        carData.store
      )

      if (!storeId) {
        return res.status(404).json({ msg: 'Loja não encontrada' })
      }

      const cars = await this.carService.add(storeId, car);

      return res.status(201).json(cars);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Erro interno do servidor: ' + error })
    }
  }

  public async updateCar(req: Request, res: Response){
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const id = req.params.id;
      const car = await this.carService.getById(id); 

      if (!car) return res.status(404).json({ msg: 'Carro não encontrado' });

      const carData: updateCarDTO = req.body;
      
      const newCar = await this.carService.update(id, carData);

      return res.status(200).json(newCar);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Erro interno do servidor: ' + error })
    }
  }

  public async removeCar(req: Request, res: Response){
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const id = req.params.id;

      const car = await this.carService.getById(id);

      if (!car) return res.status(404).json({ msg: 'Carro não encontrado' })

      await this.carService.remove(id);
      const cars = await this.carService.getAll();
      return res.status(200).json(cars);
      
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Erro interno do servidor: ' + error })
    }
  }
}

export default CarController;