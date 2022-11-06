import { Schema } from 'mongoose';

const CategorySchema = new Schema(
	{
		name: { type: String, required: true, default: '일반' },
	},
	{
		collection: 'categories',
		timestamps: true,
	},
);

export { CategorySchema };
