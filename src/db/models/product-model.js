import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('product', ProductSchema);

export class ProductModel {
	//-----------상품 필터(카데고리)------------

	// 모든제품 가져오기
	async findAll() {
		return await Product.find({}).populate('category');
	}

	// 해당 제품 _id로 가져오기
	async findById(_id) {
		return await Product.findOne({ _id }).populate('category');
		// return await Product.findById({ _id }); //하나의 document를 받아옴
	}

	// 해당 제품이름으로 가져오기
	async findByName(name) {
		return await Product.findOne({ name }).populate('category');
	}

	// 해당 제품크기로 가져오기
	async findBySize(size) {
		return await Product.find({ size }).populate('category');
	}

	// 해당 제품색상으로 가져오기
	async findByColor(color) {
		return await Product.find({ color }).populate('category');
	}

	// 해당 제품가격으로 가져오기
	async findByPrice(price1, price2) {
		return await Product.find({ price: { $gte: price1, $lte: price2 } }).populate('category');
	}

	// 무료배송여부로 가져오기
	async findByFreeDelivery(boolean) {
		return await Product.find({ free_delivery: boolean }).populate('category');
	}

	//   // 해당 제품카테고리로 가져오기
	// async findByCategory(category) {
	//   return await Product.find({ category });
	// }

	//-------상품 추가 -------
	async create(productInfo) {
		return await Product.create(productInfo);
	}

	//-------상품 수정 -------
	// 해당 id로 상품을 찾고 update로 수정 후, 수정된 값을 리턴
	async update({ _id, updateInfo }) {
		//update = {aaa:bb}
		const filter = { _id };
		const option = { returnOriginal: false };

		return await Product.findOneAndUpdate(filter, updateInfo, option).populate('category');
	}

	//-------상품 삭제 -------
	async delete(_id) {
		return Product.deleteOne(_id).populate('category');
	}
}

const productModel = new ProductModel();

export { productModel };
