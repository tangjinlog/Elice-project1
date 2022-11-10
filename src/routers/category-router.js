import { Router } from 'express';
import { adminOnly, loginRequired } from '../middlewares';
import { categoryService } from '../services';

const categoryRouter = Router();

// 1. 신규 카데고리 생성
categoryRouter.post('/category', adminOnly, async function (req, res, next) {
	try {
		const { name, description } = req.body;
		const newCategory = await categoryService.addCategory({
			name,
			description,
		});

		res.status(201).json(newCategory);
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
			console.log(deleteCategoryResult);

			res.status(201).json(deleteCategoryResult);
		} catch (err) {
			next(err);
		}
	},
);

export { categoryRouter };
