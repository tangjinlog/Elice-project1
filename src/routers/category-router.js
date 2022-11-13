import { Router } from 'express';
import { adminOnly, loginRequired } from '../middlewares';
import { categoryService } from '../services';

const categoryRouter = Router();

// 1. 신규 카데고리 생성
categoryRouter.post('/category', adminOnly, async function (req, res, next) {
	try {
		const { name, description } = req.body;
		await categoryService.addCategory({
			name,
			description,
		});

		res.status(201).redirect('/admin/addCategory/addCategory.html')
	} catch (error) {
		next(error);
	}
});

// 2. 전체 카테고리 목록 조회
categoryRouter.get(
	'/categories',
	loginRequired,
	async function (req, res, next) {
		try {
			const categories = await categoryService.getAllCategories();

			res.status(200).json(categories);
		} catch (error) {
			next(error);
		}
	},
);

// 3-1. _id로 카데고리 조회
categoryRouter.get(
	'/category/:categoryId',
	adminOnly,
	async function (req, res, next) {
		try {
			const { categoryId } = req.params;
			const categoryData = await categoryService.findCategoryById(categoryId);
			res.status(200).json(categoryData);
		} catch (error) {
			next(error);
		}
	},
);

// 4. _id로 카테고리 수정(admin)
categoryRouter.patch(
	'/category/:categoryId',
	adminOnly,
	async function (req, res, next) {
		try {
			const { categoryId } = req.params;
			const { name, description } = req.body;

			const updateInfo = {
				...(name && { name }),
				...(description && { description }),
			};
			// 코치님! ↑ 이렇게 업데이트 내용을 주는걸 스켈레톤코드에서 보고 적용시켜본건데
			// 예들들어 업데이트내용으로 name값(뒤에{name})까지 있으면 업데이트값 보내고, 하나라도 없으면 원래값(앞에name)을 updateInfo로 보내는걸로
			// 이해를 했습니다. 그런데 사실 업데이트로 mongoose의 patch메소드를 쓰면 
			// 변경요청 받은 속성만 업데이트되고 기재되지 않은 속성은 원래값을 유지하기 때문에 이런 코드는 굳이 필요가 없는것 아닌가요?
			// 이런 과정이 없어도 업데이트 적용이 잘 되는 것같아 제 코드에선 다른 곳에는 사용하지 않았는데
			// 이렇게 선언해줄 시 이점이 있는건지 궁금합니다.


			// 카테고리 정보 업데이트
			const updatedCategoryInfo = await categoryService.editCategory(
				categoryId,
				updateInfo,
			);

			// 업데이트된 카테고리 데이터를 프론트 json형태로 전달
			res.status(200).json(updatedCategoryInfo);
		} catch (error) {
			next(error);
		}
	},
);

// 5. _id로 카데고리 삭제
categoryRouter.delete(
	'/category/:categoryId',
	adminOnly,
	async function (req, res, next) {
		try {
			const { categoryId } = req.params;
			const deleteCategoryResult = await categoryService.deleteCategory(
				categoryId,
			);

			res.status(201).json(deleteCategoryResult);
		} catch (err) {
			next(err);
		}
	},
);

export { categoryRouter };
