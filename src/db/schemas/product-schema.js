import { Schema } from 'mongoose';

const ProductSchema = new Schema(
	{
		name: { type: String, required: true },
		size: { type: String, required: true },
		color: { type: String, required: true },
		price: { type: Number, required: true },
		free_delivery: { type: Boolean, required: true },
		// sellerId:{type: Schema.Types.ObjectId, required: true, ref: 'user'},
		categoryId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'category',
		},
		detailDescription: { type: String, required: true },
		// imageKey: { type: Number, required: true },
		stock: { type: Number, default: 1 },
	},
	{
		collection: 'products',
		timestamps: true,
	},
);

export { ProductSchema };
