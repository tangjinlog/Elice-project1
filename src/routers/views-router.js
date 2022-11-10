import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

viewsRouter.use('/', serveStatic('home'));
viewsRouter.use('/account', serveStatic('account'));
viewsRouter.use('/account/add', serveAccountStatic(`add`));
viewsRouter.use('/account/orders', serveAccountStatic(`orders`));
viewsRouter.use('/account/security', serveAccountStatic(`security`));
viewsRouter.use('/account/signout', serveAccountStatic(`signout`));
viewsRouter.use('/admin', serveStatic('admin'));
viewsRouter.use('/admin/addProduct', serveAdminStatic(`addProduct`));
viewsRouter.use('/admin/addCategory', serveAdminStatic(`addCategory`));
viewsRouter.use('/admin/orderManagement', serveAdminStatic(`orderManagement`));
viewsRouter.use('/admin/userManagement', serveAdminStatic(`userManagement`));
viewsRouter.use('/cart', serveStatic('cart'));
viewsRouter.use('/complete', serveStatic('complete'));
viewsRouter.use('/goods', serveStatic('goods'));
viewsRouter.use('/goods-detail/:id', serveStatic('goods-detail'));
viewsRouter.use('/register', serveStatic('register'));
viewsRouter.use('/login', serveStatic('login'));
viewsRouter.use('/admin/addProduct', AdminserveStatic('addProduct'));

// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use('/', serveStatic(''));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
	const resourcePath = path.join(__dirname, `../views/${resource}`);
	const option = { index: `${resource}.html` };
	return express.static(resourcePath, option);
}
function serveAdminStatic(resource) {
	const resourcePath = path.join(__dirname, `../views/admin/${resource}`);
	const option = { index: `${resource}.html` };
	return express.static(resourcePath, option);
}
function serveAccountStatic(resource) {
	const resourcePath = path.join(__dirname, `../views/account/${resource}`);
	const option = { index: `${resource}.html` };
	return express.static(resourcePath, option);
}
function serveCategoryStatic(resource) {
	const resourcePath = path.join(__dirname, `../views/${resource}`);
	const option = { index: `${resource}.html` };
	return express.static(resourcePath, option);
}
function AdminserveStatic(resource) {
	const resourcePath = path.join(__dirname, `../views/admin/${resource}`);
	const option = { index: `${resource}.html` };

	// express.static 은 express 가 기본으로 제공하는 함수임
	return express.static(resourcePath, option);
}
export { viewsRouter };
