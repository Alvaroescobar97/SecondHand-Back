var express = require('express');
var clothesController = require('../controllers/clothes');
var clothes_routes = express.Router();

var middlewares = require('../middlewares/verifyToken');

var multiparty = require('connect-multiparty');
var md_upload = multiparty({ uploadDir: './upload/clothes' });

clothes_routes.get('/', clothesController.list);
clothes_routes.get('/onSale',middlewares.verifyToken, clothesController.listClothesOfOneUser);
clothes_routes.get('/:id', clothesController.getOneById);
clothes_routes.post('/create', middlewares.verifyToken ,clothesController.create);
clothes_routes.put('/:id', middlewares.verifyToken ,clothesController.update);
clothes_routes.delete('/:id', middlewares.verifyToken ,clothesController.delete);
clothes_routes.post('/upload-images/:id', [middlewares.verifyToken, md_upload] ,clothesController.upload);
clothes_routes.get('/get-images/:id', clothesController.getFiles);

module.exports = clothes_routes;