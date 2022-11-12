import { categoryModel, productModel } from '../db';
class CategoryService {
	constructor(categoryModel, productModel) {
		this.categoryModel = categoryModel;
		this.productModel = productModel;
	}

	// 1. 신규 카데고리 등록하기
	async addCategory(categoryInfo) {
		const { name } = categoryInfo;

		// 카데고리명 중복 확인
		const isExistCategory = await this.categoryModel.findByName(name);
		if (isExistCategory) {
			throw new Error(
				'이 카데고리는 이미 등록되어있습니다. 다른 카데고리명을 입력해 주세요.',
			);
		}

		// db에 저장
		const createdNewCategory = await this.categoryModel.create(categoryInfo);

		// 정상적으로 등록됐는지 체크
		const newCategoryCheck = await this.categoryModel.findById(
			createdNewCategory._id,
		);
		if (!newCategoryCheck) {
			const error = new Error('카데고리가 정상적으로 등록되지 않았습니다.');
			error.name = 'InternalServerError';
			throw error; //코드리뷰 - 에러코드로 프론트에 전달해보세요
		}
		return createdNewCategory;
	}

	// 2. 전체 카테고리 목록 조회히기
	async getAllCategories() {
		return await this.categoryModel.findAll();
	}

	// 3. 카데고리 이름으로 조회하기
	async findCategoryByName(categoryName) {
		const isExistCategory = await this.categoryModel.findByName(categoryName);
		if (!isExistCategory) {
			const error = new Error(
				'등록되어있지 않은 카테고리입니다. 카데고리 이름을 다시 확인해주세요.',
			);
			error.name = 'NotFound';
			throw error;
		}
		return category;
	}

	// 3-1. 카데고리 _id로 조회하기
	async findCategoryById(categoryId) {
		const isExistCategory = await this.categoryModel.findById(categoryId);
		if (!isExistCategory) {
			const error = new Error(
				'등록되어있지 않은 카테고리입니다. 카데고리 id를 다시 확인해주세요.',
			);
			error.name = 'NotFound';
			throw error;
		}
		return isExistCategory;
	}

	// 4. 카테고리 수정
	async editCategory(categoryId, updateInfo) {
		// 업데이트 진행
		return await this.categoryModel.update({
			categoryId,
			updateInfo,
		});
	}

	//5. 카데고리 삭제
	async deleteCategory(categoryId) {
		//상품 등록 여부 확인
		// const isExistProduct = await this.productModel.findOneByCategoryId(
		// 	categoryId,
		// );
		// if (isExistProduct) {
		// 	throw new Error(
		// 		`_id:${categoryId} 카데고리에 등록되어 있는 상품이 있습니다. 등록된 상품 이동 후, 카데고리를 삭제해주세요.`,
		// 	);
		// }
		const { deleteCount } = await this.categoryModel.delete(categoryId);

		if (deleteCount === 0) {
			throw new Error(`${categoryId} 카데고리 삭제에 실패했습니다.`);
		}

		return { result: 'success' };
	}
}

const categoryService = new CategoryService(categoryModel, productModel);

export { categoryService };
