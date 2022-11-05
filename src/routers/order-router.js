import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { orderService } from '../services';
import { adminOnly } from '../middlewares/admin-only';

const orderRouter = Router();

// 주문 추가 api
orderRouter.post('/order', loginRequired, async (req, res, next) => {
	try {
		// Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
		// application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
		if (is.emptyObject(req.body)) {
			throw new Error(
				'headers의 Content-Type을 application/json으로 설정해주세요',
			);
		}

		// login-required 미들웨어의 요청으로부터 로그인된 userId를 가져옴
		const userId = req.currentUserId;
		// req의 body에서 데이터 가져오기
		const { totalPrice, detailDescription, address, request, status } =
			req.body;

		// 생성할 객체 설정함
		const orderInfo = {
			...(userId && { userId }),
			...(totalPrice && { totalPrice }),
			...(detailDescription && { detailDescription }),
			...(address && { address }),
			...(request && { request }),
			...(status && { status }),
		};

		// order DB에 추가하기
		const newOrder = await orderService.addOrder(orderInfo);

		// 추가된 데이터 반환
		res.status(201).json(newOrder);
	} catch (error) {
		next(error);
	}
});

// 전체 주문 조회
orderRouter.get('/orderlist/all', adminOnly, async (req, res, next) => {
	try {
		// 전체 제품 목록 얻기
		const orders = await orderService.getOrders();

		// 주문 목록(배열)을 JSON으로 반환
		res.status(200).json(orders);
	} catch (error) {
		next(error);
	}
});

// 특정 유저의 주문목록 조회
orderRouter.get('/orderlist/user', loginRequired, async (req, res, next) => {
	try {
		// login-required 미들웨어의 요청으로부터 로그인된 userId를 가져옴
		const userId = req.currentUserId;

		// 특정 유저의 주문목록 조회
		const ordersByUser = await orderService.getOrdersByUser(userId);

		// 특정 유저의 주문목록(배열)을 JSON형태로 반환
		res.status(200).json(ordersByUser);
	} catch (error) {
		next(error);
	}
});

// 주문 수정
orderRouter.patch('/orders/:orderId', loginRequired, async (req, res, next) => {
	try {
		// content-type 을 application/json 로 프론트에서
		// 설정 안 하고 요청하면, body가 비어 있게 됨.
		if (is.emptyObject(req.body)) {
			throw new Error(
				'headers의 Content-Type을 application/json으로 설정해주세요',
			);
		}

		// login-required 미들웨어의 요청으로부터 로그인된 userId를 가져옴
		const userId = req.currentUserId;

		// params로부터 orderId 가져옴
		const { orderId } = req.params;

		// orderId에 해당하는 order를 확인
		let order = await orderService.getOrderById(orderId);

		// 로그인된 사용자가, 해당 주문의 소유자인지 확인
		if (order.userId != userId) {
			throw new Error('주문 수정 권한이 없습니다. 다시 한 번 확인해주세요.');
		}

		// 수정할 객체 만들기
		const orderInfoRequired = { orderId };

		// req의 body에서 데이터 가져오기
		const { totalPrice, detailDescription, address, request, status } =
			req.body;

		// 업데이트할 객체 설정하기
		// default로 기존 정보 사용
		const toUpdate = {
			...(userId && { userId }),
			...(totalPrice && { totalPrice }),
			...(detailDescription && { detailDescription }),
			...(address && { address }),
			...(request && { request }),
			...(status && { status }),
		};

		// 업데이트 진행
		const updatedOrderInfo = await orderService.setOrder(
			orderInfoRequired,
			toUpdate,
		);

		// 업데이트된 주문 정보를 반환
		res.status(200).json(updatedOrderInfo);
	} catch (error) {
		next(error);
	}
});

// 주문 삭제
orderRouter.delete(
	'/orders/:orderId',
	loginRequired,
	async (req, res, next) => {
		try {
			// 삭제 권한 확인
			// login-required 미들웨어의 요청으로부터 로그인된 userId를 가져옴
			const userId = req.currentUserId;

			// params로부터 orderId 가져옴
			const { orderId } = req.params;

			// orderId에 해당하는 order를 확인
			let order = await orderService.getOrderById(orderId);

			// 로그인된 사용자가, 해당 주문의 소유자인지 확인
			if (order.userId != userId) {
				throw new Error('주문 삭제 권한이 없습니다. 다시 한 번 확인해주세요.');
			}

			// 삭제 시도
			const deleteResult = await orderService.deleteOrder(orderId);

			// 삭제 결과 반환
			res.status(200).json(deleteResult);
		} catch (error) {
			next(error);
		}
	},
);

export { orderRouter };
