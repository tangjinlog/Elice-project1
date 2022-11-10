import { Router } from 'express';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { userService } from '../services';

const userRouter = Router();

// 회원가입 api (아래는 /register이지만, 실제로는 /api/register로 요청해야 함.)
userRouter.post('/register', async (req, res, next) => {
	try {
		const { fullName, email, password, phoneNumber, address, role } = req.body;

		const userInfo = {
			...(fullName && { fullName }),
			...(email && { email }),
			...(password && { password }),
			...(phoneNumber && { phoneNumber }),
			...(address && { address }),
			...(role && { role }),
		};
		console.log(userInfo);
		const newUser = await userService.addUser(userInfo);

		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
});

// 로그인 api (아래는 /login 이지만, 실제로는 /api/login로 요청해야 함.)
userRouter.post('/login', async function (req, res, next) {
	try {
		const { email, password } = req.body;
		const userToken = await userService.getUserToken({ email, password });

		res.status(200).json(userToken);
	} catch (error) {
		next(error);
	}
});

// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
userRouter.get('/userlist', loginRequired, async function (req, res, next) {
	try {
		const users = await userService.getUsers();

		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

// 사용자 정보 수정
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
userRouter.patch(
	'/users/:userId',
	loginRequired,
	async function (req, res, next) {
		try {
			const userId = req.params.userId;

			// body data 로부터 업데이트할 사용자 정보를 추출함.
			const fullName = req.body.fullName;
			const password = req.body.password;
			const address = req.body.address;
			const phoneNumber = req.body.phoneNumber;
			const role = req.body.role;

			// body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
			const currentPassword = req.body.currentPassword;

			// currentPassword 없을 시, 진행 불가
			if (!currentPassword) {
				throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
			}

			const userInfoRequired = { userId, currentPassword };

			// 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
			// 보내주었다면, 업데이트용 객체에 삽입함.
			const toUpdate = {
				...(fullName && { fullName }),
				...(password && { password }),
				...(address && { address }),
				...(phoneNumber && { phoneNumber }),
				...(role && { role }),
			};

			// 사용자 정보를 업데이트함.
			const updatedUserInfo = await userService.setUser(
				userInfoRequired,
				toUpdate,
			);

			// 업데이트 이후의 유저 데이터를 프론트에 보내 줌
			res.status(200).json(updatedUserInfo);
		} catch (error) {
			next(error);
		}
	},
);

export { userRouter };
