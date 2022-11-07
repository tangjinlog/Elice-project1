import { Schema } from 'mongoose';

const ProductSchema = new Schema(
	{
		name: { type: String, required: true },
		size: { type: String, required: true },
		color: { type: String, required: true },
		price: { type: Number, required: true },
		free_delivery: { type: Boolean, required: true },
		category: { type: Schema.Types.ObjectId, required: true, ref: 'category' },
		stock: { type: Number, default: 1 },
	},
	{
		collection: 'products',
		timestamps: true,
	},
);

export { ProductSchema };
