export type CarDTO = {
  brand: string;
  model: string;
  year: number;
  plate: string;
  available: boolean;
}

export type ViewCarDTO = {
  id: number,
  brand: string;
  model: string;
  year: number;
  available: boolean;
}

export type updateCarDTO = Partial<CarDTO>