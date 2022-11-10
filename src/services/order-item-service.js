import { orderItemModel } from '../db';

class OrderItemService {
	constructor(orderItemModel) {
		this.orderItemModel = orderItemModel;
	}

	async addItem(orderItemInfo) {
		return await this.orderItemModel.create(orderItemInfo);
	}

	async getItems() {
		return await this.orderItemModel.findAll();
	}

	async getItemsByOrderId(orderId) {
		return await this.orderItemModel.findAllByOrderId(orderId);
	}

	async getItemsByProductId(productId) {
		return await this.orderItemModel.findAllByProductId(productId);
	}

	async setItem(orderItemId, toUpdate) {
		const updatedOrderItem = await this.orderItemModel.update({
			orderItemId,
			update: toUpdate,
		});

		return updatedOrderItem;
	}

	async getItemData(orderItemId) {
		const orderItem = await this.orderItemModel.findById(orderItemId);

		// db에서 찾지 못한 경우, 에러 메시지 반환
		if (!orderItem) {
			throw new Error(
				'해당 id의 주문아이템은 없습니다. 다시 한 번 확인해 주세요.',
			);
		}

		return orderItem;
	}

	async deleteItemData(orderItemId) {
		const { deletedCount } = await this.orderItemModel.deleteById(orderItemId);

		// 삭제에 실패한 경우, 에러 메시지 반환
		if (deletedCount === 0) {
			throw new Error(`${orderItemId} 주문의 삭제에 실패하였습니다`);
		}

		return { result: 'success' };
	}
}

const orderItemService = new OrderItemService(orderItemModel);

export { orderItemService };
