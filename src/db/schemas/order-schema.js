import { Schema } from 'mongoose';

const OrderSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
		totalPrice: { type: Number, required: true },
		detailDescription: {
			type: String,
			default: '자세한 설명을 쓰는 곳입니다.',
			required: false,
		},
		address: new Schema({
			postalCode: { type: String, require: true },
			address1: { type: String, required: true },
			address2: String,
			_id: false,
		}),
		request: { type: String, required: false },
		status: { type: String, required: false, default: '상품 준비중' },
	},
	{
		timestamps: true,
	},
);

export { OrderSchema };
