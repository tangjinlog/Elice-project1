import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';
const Order = model('orders', OrderSchema);

export class OrderModel {
	async findAll() {
		return await Order.find({});
	}

	async create(orderInfo) {
		return await Order.create(orderInfo);
	}

	async findByUserId(userId) {
		// DB에서 userId를 populate하기
		return await Order.find({ userId }).populate('userId');
	}

	async findByOrderId(orderId) {
		return await Order.findOne({ _id: orderId });
	}

	async update({ orderId, update }) {
		const filter = { _id: orderId };
		const option = { returnOriginal: false };

		return await Order.findOneAndUpdate(filter, update, option);
	}

	async delete(orderId) {
		return await Order.deleteOne({ _id: orderId });
	}
}

const orderModel = new OrderModel();

export { orderModel };
