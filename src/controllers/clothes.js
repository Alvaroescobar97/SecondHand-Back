var Clothes = require('../models/Clothes');
var User = require('../models/User');

exports.getOneById = async (req, res) => {
    var { id } = req.params;

    try {
        var clothe = await Clothes.findById(id);
        if(!clothe){
            return res.status(404).json({ message: "The clothe was not found" });
        }
        return res.status(200).json(clothe);
    } catch (error) {
        return res.status(404).json({ message: "Clothe not found" });
    }
    
    
}

exports.create = async (req, res) => {
    var { reference, description, price, color, size, category } = req.body;
    var seller = req.userId;
    
    if (reference && price && size) {
        const clothe = new Clothes({
            reference, description, price, color, size, category, seller
        });

        const clotheSaved = await clothe.save();

        await User.updateOne({_id: seller},{ $push:{clothesForSale: clotheSaved._id}});

        return res.status(200).json({ clotheSaved });
    } else {
        return res.status(400).json({ message: "Faltan campos" });
    }

}

exports.list = async (req, res) => {
    const clothes = await Clothes.find({});

    if (!clothes) {
        return res.status(400).json({ message: "No Clothes registered" });
    }

    return res.status(200).json({ clothes });

}

exports.listClothesOfOneUser = async (req, res) => {
    const user = await User.findById(req.userId, {password: 0}).populate("clothesForSale");

    if (!user.clothesForSale) {
        return res.status(404).json({ message: "No Clothes For Sale" });
    }else{
        return res.status(200).json({ clothesForSale : user.clothesForSale });
    }

}

exports.update = async (req, res) => {
    var id = req.params.id;

    const clothe = await Clothes.findById(id);

    if (!clothe) {
        return res.status(404).json({ message: "The clothe was not found" });
    } else {
        var { reference, description, price, color, size, category } = req.body;
        clothe.reference = reference ? reference : clothe.reference;
        clothe.description = description ? description : clothe.description;
        clothe.price = price ? price : clothe.price;
        clothe.color = color? color : clothe.color;
        clothe.size = size? size : clothe.size;
        clothe.category = category? category : clothe.category;

        const clotheSaved = await clothe.save();
        return res.status(200).json({ clotheSaved });
    }

}

exports.delete = async (req, res) =>{
    const id = req.params.id;

    try {
        const clothe = await Clothes.findById(id);
        clothe.delete();
        return res.status(200).json({ message: "The clothe was deleted" });
    } catch (error) {
        return res.status(404).json({ message: "The clothe was not found" });
    }
}