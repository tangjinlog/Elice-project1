import { model } from 'mongoose';
import { OrderItemSchema } from '../schemas/order-item-schema';

const OrderItem = model('order-items', OrderItemSchema);

export class OrderItemModel {
	async findById(orderItemId) {
		return await OrderItem.findOne({ _id: orderItemId });
	}

	async findAllByOrderId(orderId) {
		return await OrderItem.find({ orderId });
	}

	async findAllByProductId(productId) {
		return await OrderItem.find({ productId });
	}

	async create(orderItemInfo) {
		return await OrderItem.create(orderItemInfo);
	}

	async findAll() {
		return await OrderItem.find({});
	}

	async update({ orderItemId, update }) {
		const filter = { _id: orderItemId };
		const option = { returnOriginal: false };

		const updatedOrderItem = await OrderItem.findOneAndUpdate(
			filter,
			update,
			option,
		);
		return updatedOrderItem;
	}

	async deleteById(orderItemId) {
		return await OrderItem.deleteOne({ _id: orderItemId });
	}
}

const orderItemModel = new OrderItemModel();

export { orderItemModel };
