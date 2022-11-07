// import is from '@isindresorhus/is';
import is from '@sindresorhus/is';
import { Router } from 'express';
// import { adminOnly, loginRequired } from '../services';
import { categoryService } from '../services';

const categoryRouter = Router();

// 1. 신규 카데고리 생성(admin)
categoryRouter.post(
	'/category',
	/*adminOnly,*/ async function (req, res, next) {
		try {
			// application/json 설정을 프론트에서 안하면, body가 비어 있게 됨.
			if (is.emptyObject(req.body)) {
				throw new Error(
					'headers의 Content-Type을 application/json으로 설정해주세요.',
				);
			}

			// req(request)에서 데이터 가져오기
			const { name, discription } = req.body;
			const newCategory = await categoryService.addCategory({
				name,
				discription,
			});

			res.status(201).json(newCategory);
		} catch (error) {
			next(error);
		}
	},
);

// 2. 전체 카테고리 목록 조회 api
categoryRouter.get('/categories', async function (req, res, next) {
	try {
		const categories = await categoryService.getAllCategories();

		res.status(200).json(categories);
	} catch (error) {
		next(error);
	}
});

// 3-1. 카데고리 _id로 조회 api
categoryRouter.get('/category-id/:categoryId', async function (req, res, next) {
	try {
		const { categoryId } = req.params;
		const category = await categoryService.findCategoryById(categoryId);
		res.status(200).json(category);
	} catch (error) {
		next(error);
	}
});

// 4. 카테고리 정보 수정
categoryRouter.patch(
	'edit-category/:categoryId',
	/*loginRequired, adminRequired,*/ async function (req, res, next) {
		try {
			// req.params 으로부터 categoryId 추출
			const { categoryId } = req.params;

			// req.body 로부터 업데이트할 카테고리 정보 추출.
			// const { name } = req.body;

			// 카테고리 정보 업데이트
			const updatedCategoryInfo = await categoryService.editCategory(
				categoryId,
				req.body,
			);

			// 업데이트된 카테고리 데이터를 프론트 json형태로 전달
			res.status(200).json(updatedCategoryInfo);
		} catch (error) {
			next(error);
		}
	},
);

// 5. 카데고리 삭제
categoryRouter.delete(
	'delete-category/:categoryId',
	async function (req, res, next) {
		try {
			const { categoryId } = req.params;
			const delCategory = await categoryService.deleteCategory(categoryId);

			res.status(201).json(delCategory);
		} catch (err) {
			next(err);
		}
	},
);

export { categoryRouter };
