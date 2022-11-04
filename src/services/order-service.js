import { orderModel } from '../db';

class OrderService {
	constructor(orderModel) {
		this.orderModel = orderModel;
	}

	async addOrder(orderInfo) {
		return await this.orderModel.create(orderInfo);
	}

	async getOrderById(orderId) {
		return await this.orderModel.findById(orderId);
	}

	async deleteOrder(orderId) {
		return await this.orderModel.delete(orderId);
	}
}

const orderService = new OrderService(orderModel);

export { orderService };
