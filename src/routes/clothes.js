var express = require('express');
var clothesController = require('../controllers/clothes');
var clothes_routes = express.Router();
var middlewares = require('../middlewares/verifyToken');

clothes_routes.get('/', clothesController.list);
clothes_routes.get('/:id', clothesController.getOneById);
clothes_routes.post('/create', middlewares.verifyToken ,clothesController.create);
clothes_routes.put('/:id', middlewares.verifyToken ,clothesController.update);
clothes_routes.delete('/:id', middlewares.verifyToken ,clothesController.delete);

module.exports = clothes_routes;