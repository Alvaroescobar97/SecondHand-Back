const express = require('express');
const cors = require('cors');
const app = express(); 

const http = require('http');
const server = http.Server(app);

app.use(express.json());

var auth_routes = require('./routes/auth');
var clothes_routes = require('./routes/clothes');

// Configurar cors
app.use(cors());

app.use('/api', auth_routes);
app.use('/api/clothes', clothes_routes);

module.exports = server;