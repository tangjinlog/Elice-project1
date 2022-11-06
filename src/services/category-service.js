import { categoryModel } from '../db';

class CategoryService {
	constructor(categoryModel) {
		this.categoryModel = categoryModel;
	}

	// 1. 신규 카데고리 등록하기
	async addCategory(categoryName) {
		// 카데고리명 중복 확인 
		const existCategory = await this.categoryModel.findByName(categoryName);
		if (existCategory) {
			throw new Error(
				'이 카데고리는 이미 등록되어있습니다. 다른 카데고리명을 입력해 주세요.',
			);
		}

		// db에 저장
		const createdNewCategory = await this.categoryModel.create(categoryName);

		// 정상적으로 등록됐는지 체크
		const newCategoryCheck = await this.categoryModel.findById(
			createdNewCategory._id,
		);
		if (!newCategoryCheck) {
			const error = new Error('카데고리가 정상적으로 등록되지 않았습니다.');
			error.name = 'InternalServerError';
			throw error;
		}
		return createdNewCategory;
	}

	// 2. 전체 카테고리 목록 조회히기
	async getAllCategories() {
		return await this.categoryModel.findAll();
	}

	// 3. 카테고리 이름으로 조회하기
	async findCategoryByName(categoryName) {
		const category = await this.categoryModel.findByName(categoryName);
		if (!category) {
			const error = new Error('등록되어있지 않은 카테고리입니다.');
			error.name = 'NotFound';
			throw error;
		}
		return category;
	}

	// 3-1. 카데고리 _id로 조회하기
	async findCategoryById(categoryId) {
		//상품 등록 여부 확인
		const category = await this.categoryModel.findById(categoryId);
		if (!category) {
			const error = new Error('등록되어있지 않은 카테고리입니다.');
			error.name = 'NotFound';
			throw error;
		}
		return category;
	}

	// 4. 카테고리 수정
	async editCategory(categoryId, updateInfo) {
		const category = await this.categoryModel.findById(categoryId);

		// db에서 찾지 못한 경우, 에러 메시지 반환
		if (!category) {
			const error = new Error('등록되어있지 않은 카테고리입니다.');
			error.name = 'NotFound';
			throw error;
		}

		// 업데이트 진행
		updatedCategory = await this.categoryModel.update(categoryId, updateInfo);

		return updatedCategory;
	}

	//5. 카데고리 삭제
	async deleteCategory(categoryId) {
		const category = await this.categoryModel.findByName(categoryId);
		if (!category) {
			throw new Error('존재하지 않는 상품입니다.');
		}
		return await this.categoryModel.delete(categoryId);
	}
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
