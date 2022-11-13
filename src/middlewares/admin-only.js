import jwt from 'jsonwebtoken';

const adminOnly = (req, res, next) => {
	// request 헤더로부터 authorization bearer 토큰을 받음.
	const userToken = req.headers['authorization']?.split(' ')[1];

	// 이 토큰은 "jwt Token" || "null" || undefined
	// 토큰이 "null"일 경우, adminOnly가 필요한 서비스 사용을 제한함.
	if (!userToken || userToken === 'null') {
		console.log(
			'서비스 사용 요청이 있습니다. 하지만, Authorization 토큰: 없음',
		);
		res.status(403).json({
			result: 'forbidden-approach',
			reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
		});

		return;
	}

	// JWT 토큰을 verify하고, role를 확인해야함.
	// 먼저, JWT 토큰이 정상적인 토큰인지 확인
	try {
		const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
		const jwtDecoded = jwt.verify(userToken, secretKey);

		const { role } = jwtDecoded;

		// role이 관리자일 경우, 통과 시킴
		if (role === 'admin') {
			next();
			return;
		}

		// 그렇지 않은 경우
		res.status(403).json({
			result: 'forbidden-approach',
			reason: '관리자만 사용할 수 있는 서비스입니다.',
		});

		return;
	} catch (error) {
		// jwt.verify 함수가 에러를 발생시키는 경우는 token이 정상적으로 decode 안되었을 경우임.
		// 403 코드로 JSON 형태로 프론트에 리턴
		res.status(403).json({
			result: 'forbidden-approach',
			reason: '정상적인 토큰이 아닙니다.',
		});

		return;
	}
};

export { adminOnly };
