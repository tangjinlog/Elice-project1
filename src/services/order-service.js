import { orderModel } from '../db';

class OrderService {
	constructor(orderModel) {
		this.orderModel = orderModel;
	}
	// 주문 추가
	async addOrder(orderInfo) {
		return await this.orderModel.create(orderInfo);
	}
	// 특정 주문 조회
	async getOrderById(orderId) {
		const order = await this.orderModel.findByOrderId({ _id: orderId });
		if (!order) {
			throw new Error('등록된 주문이 없습니다. 다시 한 번 확인해주세요');
		}
		return order;
	}

	// 전체 주문목록 조회
	async getOrders() {
		return await this.orderModel.findAll();
	}

	// 특정 유저의 주문목록 조회
	async getOrdersByUser(userId) {
		return await this.orderModel.findByUserId(userId);
	}

	// 주문 수정
	async setOrder(orderInfoRequired, toUpdate) {
		const { orderId } = orderInfoRequired;

		// orderId의 Order가 DB에 존재하는지 확인
		let order = await this.orderModel.findByOrderId(orderId);

		// DB에 없는 경우, 에러 메시지
		if (!order) {
			throw new Error('등록된 주문이 없습니다. 다시 한 번 확인해 주세요.');
		}

		// 업데이트
		return await this.orderModel.update({
			orderId,
			update: toUpdate,
		});
	}

	// 주문 삭제
	async deleteOrder(orderId) {
		// 주문 id의 Order가 DB에 있는지 확인
		let order = await this.orderModel.findByOrderId(orderId);

		// DB에 없는 경우, 에러 메시지
		if (!order) {
			throw new Error('등록된 주문이 없습니다. 다시 한 번 확인해 주세요.');
		}

		// DB에서 삭제
		const { deletedCount } = await this.orderModel.delete(orderId);

		// 삭제 실패 시, 에러 메시지
		if (deletedCount === 0) {
			throw new Error(`${orderId} 주문 데이터 삭제에 실패했습니다.`);
		}

		return { result: 'success' };
	}
}

const orderService = new OrderService(orderModel);

export { orderService };
