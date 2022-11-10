import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    detailDescription: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, default: 1 },
  },
  {
    collection: 'products',
    timestamps: true,
  },
);

export { ProductSchema };
