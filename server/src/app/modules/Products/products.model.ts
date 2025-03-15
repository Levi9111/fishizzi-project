import { model, Schema } from 'mongoose';
import { TProduct } from './products.interface';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description can not be more than 500 characters'],
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
    },
    stock: {
      type: String,
      required: [true, 'Stock is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    productImgUrl: {
      type: String,
      default: '',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

export const Products = model<TProduct>(`Products`, productSchema);
