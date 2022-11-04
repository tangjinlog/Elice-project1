import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { orderService } from '../services';

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
// userRouter.get('/orderlist', adminRequired, (req, res, next) => {});
// 특정 주문 조회
// .....보류
// 특정 유저의 주문 목록 조회
// userRouter.get('/order/:user', ,(req, res, next) => {})
// 주문 수정
// 주문 삭제
orderRouter.delete('/order/:orderId', loginRequired, async (req, res, next) => {
	try {
		// 삭제하는 id가 해당아이디와 같은지 검사
		const userId = req.currentUserId;

		const { orderId } = req.params;

		// 해당 orderId에 주문 확인
		const order = await orderService.getOrderById(orderId);

		if (!order.userId === userId) {
			throw new Error('주문을 삭제할 권한이 없습니다.');
		}

		const deleteResult = await orderService.deleteOrder(orderId);
	} catch (e) {}
});

export { orderRouter };
