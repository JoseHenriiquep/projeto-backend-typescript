import mongoose, { Schema, Types } from "mongoose";
import { Store } from "../../entities/Store";

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
  versionKey: false, // remove __v
  transform: (doc, ret: any) => {
    ret.id = ret._id.toString(); // mantém id
    delete ret._id; // remove _id duplicado
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

export const StoreModel = mongoose.model<Store>('Store', StoreSchema);