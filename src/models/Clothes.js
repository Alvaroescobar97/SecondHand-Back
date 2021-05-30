var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClothesSchema = Schema({
    reference: String,
    description: String,
    price: mongoose.SchemaTypes.Decimal128,
    color: [String],
    size: String,
    category: String
});

module.exports = mongoose.model('Clothes', ClothesSchema);