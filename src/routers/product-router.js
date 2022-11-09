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
productRouter.post('/product', async (req, res, next) => {
	try {
		const newProduct = await productService.addProduct(req.body);

		res.status(201).json(newProduct);
	} catch (error) {
		next(error);
	}
});

// 제품 목록 api
// 전체 제품 목록을 가져옴
productRouter.get('/products', async function (req, res, next) {
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
productRouter.get('/products/category/:categoryName', async function (req, res, next) {
	try {
		// category에 해당하는 제품 목록을 얻음
		const { categoryName } = req.params;
		const products = await productService.getProductsByCategoryName(categoryName);
		// 제품 목록(배열)을 JSON 형태로 프론트에 보냄
		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
});

//제품 상세 api
// 제품이름에 해당하는 제품 정보를 가져옴
// productRouter.get('/products/:productName', async function (req, res, next) {
// 	try {
// 		const { productName } = req.params;
// 		const product = await productService.getProductByName(productName);
// 		// 제품 정보를 JSON 형태로 프론트에 보냄.
// 		console.log(product)
// 		res.status(200).json(product);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// 제품id에 해당하는 제품 정보를 가져옴
productRouter.get('/products/:productId', async function (req, res, next) {
	try {
		const product = await productService.getProductById(req.params.productId);
		// 제품 정보를 JSON 형태로 프론트에 보냄.
		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
});

// productRouter.get(
// 	'/productlist/price/:price1/:price2',
// 	async function (req, res, next) {
// 		try {
// 			// category에 해당하는 제품 목록을 얻음
// 			const { price1: a, price2: b } = req.params;

// 			const products = await productService.getProductByPrice(a, b);
// 			// 제품 목록(배열)을 JSON 형태로 프론트에 보냄
// 			res.status(200).json(products);
// 		} catch (error) {
// 			next(error);
// 		}
// 	},
// );

productRouter.get(
	'/products?price_gte=price1&price_lte=price2',
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
productRouter.patch('/products/:productId', async function (req, res, next) {
	try {
		// content-type 을 application/json 로 받아와야함
		// 제품 정보를 업데이트함.
		const updatedProductInfo = await productService.editProduct(
			req.params.productId,
			req.body,
		);

		res.status(200).json(updatedProductInfo);
	} catch (error) {
		next(error);
	}
});

productRouter.delete('/products/:productId', async function (req, res, next) {
	try {
		const delProduct = await productService.deleteProduct(req.params.productId);

		res.status(201).json(delProduct);
	} catch (err) {
		next(err);
	}
});

export { productRouter };
