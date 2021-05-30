var express = require('express');
var authController = require('../controllers/auth');
var auth_routes = express.Router();

auth_routes.post('/signUp', authController.signUp);
auth_routes.post('/signIn', authController.signIn);

module.exports = auth_routes;