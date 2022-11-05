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

	async findByUser(userId) {
		// DB에서 userId를 populate하기
		const orders = await Order.find({}).populate({
			path: 'userId',
		});

		// 사용자의 주문이 없으면, 빈 배열 반환
		if (orders.length < 1) {
			return orders;
		}

		// populated 주문 리스트(배열)를 filtering 하고 주문리스트(배열) 반환
		return orders.filter((order) => order.userId._id == userId);
	}

	async findById(orderId) {
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
