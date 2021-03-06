var mongoose = require('mongoose');
var server = require('./app');
var port = process.env.PORT || 3000;
  
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/SecondHand', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    server.listen(port, () => {
        console.log(`Servidor escuchando por la direccion http://localhost:${port}/`);
    });
});
