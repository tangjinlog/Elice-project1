import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';
const Order = model('orders', OrderSchema);

export class OrderModel {
	async findAll() {
		// 모든 주문 항목 가져오기
		return await Order.find({});
	}

	async create(orderInfo) {
		return await Order.create(orderInfo);
	}

	async findById(orderId) {
		return await Order.findOne({ _id: orderId });
	}

	async delete(orderId) {
		return await Order.deleteOne({ _id: orderId });
	}
}

const orderModel = new OrderModel();

export { orderModel };
