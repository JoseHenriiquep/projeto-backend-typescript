import mongoose, { Schema, Types } from "mongoose";
import { Car } from "../../entities/Car";

const CarSchema: Schema = new Schema({
  brand: {
    type: String,
    require: true
  },
  model: {
    type: String,
    require: true
  },
  year: {
    type: String,
    require: true
  },
  plate: {
    type: String,
  },
  available: {
    type: String,
    require: true,
    default: true
  },
  store: { 
    type: Types.ObjectId, 
    ref: "Store" 
  },
});

CarSchema.virtual('stores', {
  ref: 'Store',
  localField: 'store',
  foreignField: '_id',
  justOne: true
})

CarSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  }
});
CarSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  }
});
export const CarModel = mongoose.model<Car>('Car', CarSchema);