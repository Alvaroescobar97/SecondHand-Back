var mongoose = require('mongoose');
var app = require('./app');
var port = 3000;
  
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/SecondHand', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(port, () => {
        console.log(`Servidor escuchando por la direccion http://localhost:${port}/`);
    });
});
