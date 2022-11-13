import { Router } from 'express';
import { productService } from '../services';
import { adminOnly } from '../middlewares';
import multer from 'multer';

const productRouter = Router();

const storage = multer.diskStorage({
	destination: function (req, file, cd) {
		cd(
			null,'src/views/images/products/',
		);
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});
let multerUpload = multer({ storage: storage });

// 제품 등록 api
productRouter.post(
	'/product', adminOnly, multerUpload.single('productImage'),
	async (req, res, next) => {
		try {
			const {
				name,
				size,
				color,
				price,
				free_delivery,
				detailDescription,
				category,
				stock,
			} = req.body;
			const filename = req.file.filename;
			await productService.addProduct({
				name,
				size,
				color,
				price,
				free_delivery,
				category,
				detailDescription,
				stock,
				productImage:filename,
			});

			res.status(201).redirect('/admin/addProduct/addProduct.html');
		} catch (error) {
			next(error);
		}
	},
);

// 제품 목록 api
// 전체 제품 목록을 가져옴
productRouter.get('/products', async function (req, res, next) {
	try {
		const totalProducts = await productService.getProducts();
		res.status(200).json(totalProducts);
	} catch (error) {
		next(error);
	}
});

//카테고리별 제품 목록 api
//category에 해당하는 제품 목록을 가져옴
productRouter.get(
	'/products/category/:categoryName',
	async function (req, res, next) {
		try {
			const { categoryName } = req.params;
			const products = await productService.getProductsByCategoryName(
				categoryName,
			);
			res.status(200).json(products);
		} catch (error) {
			next(error);
		}
	},
);

// 제품 상세 api
// 제품이름에 해당하는 제품 정보를 가져옴
productRouter.get(
	'/products-name/:productName',
	async function (req, res, next) {
		try {
			const { productName } = req.params;
			const product = await productService.getProductByName(productName);
			res.status(200).json(product);
		} catch (error) {
			next(error);
		}
	},
);

// 제품id에 해당하는 제품 정보를 가져옴
productRouter.get('/products/:productId', async function (req, res, next) {
	try {
		const product = await productService.getProductById(req.params.productId);
		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
});

// productRouter.get(
// 	'/productlist/price/:price1/:price2',
// 	async function (req, res, next) {
// 		try {
// 			const { price1: a, price2: b } = req.params;
// 			const products = await productService.getProductByPrice(a, b);
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
			const { price1: a, price2: b } = req.query;

			const products = await productService.getProductByPrice(a, b);
			res.status(200).json(products);
		} catch (error) {
			next(error);
		}
	},
);

// 제품 수정 api
productRouter.patch(
	'/products/:productId',
	adminOnly,
	async function (req, res, next) {
		try {
			const updatedProductInfo = await productService.editProduct(
				req.params.productId,
				req.body,
			);

			res.status(200).json(updatedProductInfo);
		} catch (error) {
			next(error);
		}
	},
);

productRouter.delete(
	'/products/:productId',
	adminOnly,
	async function (req, res, next) {
		try {
			const delProduct = await productService.deleteProduct(
				req.params.productId,
			);

			res.status(201).json(delProduct);
		} catch (err) {
			next(err);
		}
	},
);

export { productRouter };
