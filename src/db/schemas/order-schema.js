import { Schema } from 'mongoose';
import { orderService } from '../../services';

const OrderSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'users', required: true }, // userId를 user에서 참조
		totalPrice: { type: Number, required: true },
		detailDescription: {
			type: String,
			default: '자세한 설명을 쓰는 곳입니다.',
			required: false,
		},
		address: new Schema({
			postalCode: String,
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
