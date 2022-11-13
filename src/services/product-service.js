import { productModel, categoryModel } from '../db';

class ProductService {
	constructor(productModel, categoryModel) {
		this.productModel = productModel;
		this.categoryModel = categoryModel;
	}

	// 1. 제품 등록하기 - 주의!! postman에서 테스트시, 수동으로 카테고리 생성 후 _id와 name 입력 필요
	//  프론트에서 카테고리 아이디와 이름을 별도로 전달해주고 있으므로!!
	async addProduct(productInfo) {
		// 객체 destructuring
		const { name } = productInfo;

		// 제품명 중복 확인
		const isExistProduct = await this.productModel.findByName(name);
		if (isExistProduct) {
			throw new Error(
				'이 제품명은 현재 사용중입니다. 다른 제품명을 입력해 주세요.',
			);
		}
		// 카테고리명 이용 조회 후 신규 카테고리일 경우 자동 생성
		// const isExistCategory = await this.categoryModel.findByName(categoryId.name);
		// if (!isExistCategory) {
		// 	const createdNewCategory = await this.categoryModel.create(categoryId.name);
		// 	categoryId._id = createdNewCategory._id.toSrting();
		// }

		// db에 저장
		const createdNewProduct = await this.productModel.create(productInfo);

		// 정상적으로 저장됐는지 체크
		// const newProductCheck = await this.productModel.findById(
		// 	createdNewProduct._id,
		// );
		// if (!newProductCheck) {
		// 	const error = new Error('제품이 정상적으로 저장되지 않았습니다.');
		// 	error.name = 'InternalServerError';
		// 	throw error;
		// }

		return createdNewProduct;
	}

	// ----- 제품 목록받아오기 ----
	// 2. 전체목록 받아오기
	async getProducts() {
		return await this.productModel.findAll();
	}

	// 2-1. 카테고리명에 해당하는 제품 목록을 받음.
	async getProductsByCategoryName(categoryName) {
		const category = await this.categoryModel.findByName(categoryName);
    const products = await this.productModel.findAllByCategoryId(category._id);
    return products;
	}

	// id에 해당하는 제품을 받음.
	async getProductById(_id) {
		const product = await this.productModel.findById(_id);
		return product;
	}

	// 제품이름에 해당하는 제품을 받음.
	async getProductByName(name) {
		//상품 등록 여부 확인
		const product = await this.productModel.findByName(name);
		if (!product) {
			throw new Error('해당 제품을 찾을 수 없습니다.');
		}
		return product;
	}

	// 제품크기에 해당하는 제품을 받음.
	async getProductBySize(size) {
		return await this.productModel.findBySize(size);
	}

	//제품 가격범위에 해당하는 제품을 받음.
	async getProductByPrice(price1, price2) {
		return await this.productModel.findByPrice(price1, price2);
	}

	// 제품정보 수정
	async editProduct(_id, updateInfo) {
		// 우선 해당 id의 제품이 db에 있는지 확인
		let product = await this.productModel.findById(_id);
		// db에서 찾지 못한 경우, 에러 메시지 반환
		if (!product) {
			const error = new Error('등록되어있지 않은 상품입니다.');
			error.name = 'NotFound';
			throw error;
		}

		return await this.productModel.update({ _id, updateInfo });
	}

	//제품 삭제
	async deleteProduct(productId) {
		const isExistProduct = await this.productModel.findById(productId);
		if (!isExistProduct) {
			throw new Error('존재하지 않는 상품입니다.');
		}
		return await this.productModel.delete(productId); 
	}
}

const productService = new ProductService(productModel, categoryModel);

export { productService };
