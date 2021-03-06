var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClothesSchema = Schema({
    reference: String,
    description: String,
    price: mongoose.SchemaTypes.Decimal128,
    color: [String],
    size: String,
    category: String,
    images:[String],
    seller: {
        ref: "User",
        type:Schema.Types.ObjectId
    },
    buyer:{
        ref: "User",
        type:Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('Clothes', ClothesSchema);