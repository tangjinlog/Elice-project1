import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('category', CategorySchema);

export class CategoryModel {
	// 1. 카테고리 생성
	async create(categoryInfo) {
		return await Category.create(categoryInfo);
	}

	// 2. 전체 카테고리 목록 조회
	async findAll() {
		return await Category.find({});
	}

	// 3. 카테고리 이름 조회
	async findByName(name) {
		return await Category.findOne({ name });
	}

	// 3-1. 카데고리 _id 조회
	async findById(_id) {
		return await Category.findById(_id); //_id로 바로 찾음
	}

	// 4. 카데고리 수정 id로
	async update({ _id, updateInfo }) {
		const filter = { _id };
		const option = { returnOriginal: false };
		return await Category.findOneAndUpdate(filter, updateInfo, option);
	}

	// 5. 카데고리 삭제 _id로
	async delete(_id) {
		return await Category.deleteOne({ _id });
	}
}

const categoryModel = new CategoryModel();

export { categoryModel };
