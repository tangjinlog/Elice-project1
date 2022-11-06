import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';
const Category = model('category', CategorySchema);

export class CategoryModel {
	// 1. 카테고리 생성
	async create(name) {
		return await Category.create({ name });
	}

	// 2. 전체 카테고리 목록 조회
	async findAll() {
		return await Category.find({});
	}

	// 3. 카테고리 이름으로 조회
	async findByName(name) {
		return await Category.findOne({ name });
	}

	// 3-1. 카데고리 _id로 조회
	async findById(categoryId) {
		return await Category.findById(categoryId);
	}

	// 4. 카데고리 수정
	async update(_id, updateInfo) {
		const filter = { _id };
		const option = { returnOriginal: false };
		return await Category.findOneAndUpdate(filter, updateInfo, option);
	}

	// 5. 카데고리 삭제
	async delete(_id) {
		return await Category.deleteOne({ _id });
	}
}

const categoryModel = new CategoryModel();

export { categoryModel };
