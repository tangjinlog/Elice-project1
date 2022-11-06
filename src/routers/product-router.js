import { Router } from 'express';
//import fs from 'fs';
//import util from 'util';
//import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { productService } from '../services';
//import { uploadFile, deleteFile } from '../s3';
//import multer from 'multer';

const productRouter = Router();
//const upload = multer({ dest: 'public/images' });
//const unlinkFile = util.promisify(fs.unlink);

// 제품 등록 api
productRouter.post('/addproduct', async (req, res, next) => {
	try {
		// // s3에 이미지 업로드
		// const file = req.file;
		// if (file) {
		//   const result = await uploadFile(file);
		//   await unlinkFile(file.path);
		//   req.body.imageUrl = await result.Location;
		// }
		// if (req.body.image) {
		//   delete req.body.image;
		// }
		// 위 데이터를 제품 db에 추가하기
		const newProduct = await productService.addProduct(req.body);

		// 추가된 제품의 db 데이터를 프론트에 다시 보내줌
		res.status(201).json(newProduct);
	} catch (error) {
		next(error);
	}
});

// 제품 목록 api
// 전체 제품 목록을 가져옴
productRouter.get('/productlist', async function (req, res, next) {
	try {
		const totalProducts = await productService.getProducts();
		// 제품 목록(배열)을 JSON 형태로 프론트에 보냄
		res.status(200).json(totalProducts);
	} catch (error) {
		next(error);
	}
});

//카테고리별 제품 목록 api
//category에 해당하는 제품 목록을 가져옴
productRouter.get('/category/:category', async function (req, res, next) {
	try {
		// category에 해당하는 제품 목록을 얻음
		const { category } = req.params;
		const products = await productService.getProductsByCategory(category);
		// 제품 목록(배열)을 JSON 형태로 프론트에 보냄
		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
});

//제품 상세 api
// 제품이름에 해당하는 제품 정보를 가져옴
productRouter.get('/product', async function (req, res, next) {
	try {
		const { name } = req.query;
		console.log(req.query)
		console.log(req.query.name)
		const product = await productService.getProductByName(name);
		// 제품 정보를 JSON 형태로 프론트에 보냄.
		console.log(product)
		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
});

productRouter.get('/product-id/:productId', async function (req, res, next) {
	try {
		const product = await productService.getProductById(req.params.productId);
		// 제품 정보를 JSON 형태로 프론트에 보냄.
		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
});

productRouter.get(
	'/productlist/price/:price1/:price2',
	async function (req, res, next) {
		try {
			// category에 해당하는 제품 목록을 얻음
			const { price1: a, price2: b } = req.params;

			const products = await productService.getProductByPrice(a, b);
			// 제품 목록(배열)을 JSON 형태로 프론트에 보냄
			res.status(200).json(products);
		} catch (error) {
			next(error);
		}
	},
);

productRouter.get(
	'/productlist?price_gte=price1&price_lte=price2',
	async function (req, res, next) {
		try {
			// category에 해당하는 제품 목록을 얻음
			const { price1: a, price2: b } = req.query;

			const products = await productService.getProductByPrice(a, b);
			// 제품 목록(배열)을 JSON 형태로 프론트에 보냄
			res.status(200).json(products);
		} catch (error) {
			next(error);
		}
	},
);

// 제품 수정 api
// (예를 들어 /api/product/abc12345 로 요청하면 req.params._id는 'abc12345' 문자열로 됨)
productRouter.patch('/edit-product/:id', async function (req, res, next) {
	try {
		// content-type 을 application/json 로 받아와야함
		// 제품 정보를 업데이트함.
		const updatedProductInfo = await productService.editProduct(
			req.params.id,
			req.body,
		);

		// 업데이트 이후의 제품 데이터를 프론트에 보내 줌
		res.status(200).json(updatedProductInfo);
	} catch (error) {
		next(error);
	}
});

productRouter.delete('/delete/:id', async function (req, res, next) {
	try {
		console.log(req.params.id);
		const delProduct = await productService.deleteProduct(req.params.id);

		//image가 있을 경우 s3 서버에서 삭제해줌
		// if (product.imageUrl) {
		// 	const key = product.imageUrl.split('/')[3];
		// 	deleteFile(key);
		// }
		// 제품 정보를 JSON 형태로 프론트에 보냄

		res.status(201).json(delProduct);
	} catch (err) {
		next(err);
	}
});

export { productRouter };
