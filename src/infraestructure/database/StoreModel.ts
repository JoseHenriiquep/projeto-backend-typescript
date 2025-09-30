import mongoose, { Schema, Types } from "mongoose";
import { Store } from "../../entities/Store";
import { CarModel } from "./CarModel";

const StoreSchema: Schema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
});

StoreSchema.virtual('cars', {
  ref: 'Car',
  localField: '_id',
  foreignField: 'store'
})

StoreSchema.set("toJSON", {
  virtuals: true,
  versionKey: false, 
  transform: (doc, ret: any) => {
    ret.id = ret._id.toString(); 
    delete ret._id; 
    return ret;
  }
});

StoreSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  }
});

StoreSchema.pre("findOneAndDelete", async function (next) {
  const storeId = this.getQuery()["_id"]; 
  await CarModel.deleteMany({ store: storeId }); 
  next();
});

export const StoreModel = mongoose.model<Store>('Store', StoreSchema);