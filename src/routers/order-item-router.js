import { Router } from 'express';
import { adminOnly, loginRequired } from '../middlewares';
import { orderItemService } from '../services';

const orderItemRouter = Router();

orderItemRouter.post('/orderitem', loginRequired, async (req, res, next) => {
	try {
		const { orderId, productId, quantity, totalPrice, status } = req.body;

		const orderItemInfo = {
			...(orderId && { orderId }),
			...(productId && { productId }),
			...(quantity && { quantity }),
			...(totalPrice && { totalPrice }),
			...(status && { status }),
		};

		const newOrderItem = await orderItemService.addItem(orderItemInfo);

		res.status(201).json(newOrderItem);
	} catch (error) {
		next(error);
	}
});

// 전체 주문아이템 목록은 관리자만 조회 가능함
orderItemRouter.get(
	'/orderitemlist/all',
	adminOnly,
	async function (req, res, next) {
		try {
			const orderItems = await orderItemService.getItems();

			res.status(200).json(orderItems);
		} catch (error) {
			next(error);
		}
	},
);

// 특정 오더번호의 주문아이템 목록 조회
orderItemRouter.get(
	'/orderitemlist/order/:orderId',
	loginRequired,
	async function (req, res, next) {
		try {
			const orderId = req.params.orderId;
			const orderItems = await orderItemService.getItemsByOrderId(orderId);

			res.status(200).json(orderItems);
		} catch (error) {
			next(error);
		}
	},
);

// 특정 제품번호의 주문아이템 목록 조회
orderItemRouter.get(
	'/orderitemlist/product/:productId',
	loginRequired,
	async function (req, res, next) {
		try {
			const productId = req.params.productId;
			const orderItems = await orderItemService.getItemsByProductId(productId);

			res.status(200).json(orderItems);
		} catch (error) {
			next(error);
		}
	},
);

orderItemRouter.get(
	'/orderitems/:orderItemId',
	loginRequired,
	async function (req, res, next) {
		try {
			const orderItemId = req.params.orderItemId;
			const orderData = await orderItemService.getItemData(orderItemId);

			res.status(200).json(orderData);
		} catch (error) {
			next(error);
		}
	},
);

orderItemRouter.patch(
	'/orderitems/:orderItemId',
	loginRequired,
	async function (req, res, next) {
		try {
			const orderItemId = req.params.orderItemId;
			const quantity = req.body.quantity;
			const totalPrice = req.body.totalPrice;
			const status = req.body.status;

			const toUpdate = {
				...(quantity && { quantity }),
				...(totalPrice && { totalPrice }),
				...(status && { status }),
			};

			const updatedOrderItem = await orderItemService.setItem(
				orderItemId,
				toUpdate,
			);

			res.status(200).json(updatedOrderItem);
		} catch (error) {
			next(error);
		}
	},
);

orderItemRouter.delete(
	'/orderitems/:orderItemId',
	loginRequired,
	async function (req, res, next) {
		try {
			const orderItemId = req.params.orderItemId;
			const deleteResult = await orderItemService.deleteItemData(orderItemId);

			res.status(200).json(deleteResult);
		} catch (error) {
			next(error);
		}
	},
);

export { orderItemRouter };
