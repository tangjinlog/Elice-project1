import { Schema } from 'mongoose';

const CategorySchema = new Schema(
	{
		name: { type: String, unique: true, required: true, default: '일반' },
		description: { type: String },
	},
	{
		collection: 'categories',
		timestamps: true,
	},
);

export { CategorySchema };
