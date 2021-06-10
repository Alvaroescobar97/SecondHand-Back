var fs = require('fs');
var path = require('path');
var Clothes = require('../models/Clothes');
var User = require('../models/User');

exports.getOneById = async (req, res) => {
    var { id } = req.params;

    try {
        var clothe = await Clothes.findById(id).populate("seller");
        if (!clothe) {
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

        await User.updateOne({ _id: seller }, { $push: { clothesForSale: clotheSaved._id } });

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
    const user = await User.findById(req.userId, { password: 0 }).populate("clothesForSale");

    if (!user.clothesForSale) {
        return res.status(404).json({ message: "No Clothes For Sale" });
    } else {
        return res.status(200).json({ clothesForSale: user.clothesForSale });
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
        clothe.color = color ? color : clothe.color;
        clothe.size = size ? size : clothe.size;
        clothe.category = category ? category : clothe.category;

        const clotheSaved = await clothe.save();
        return res.status(200).json({ clotheSaved });
    }

}

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const clothe = await Clothes.findById(id);
        clothe.delete();
        return res.status(200).json({ message: "The clothe was deleted" });
    } catch (error) {
        return res.status(404).json({ message: "The clothe was not found" });
    }
}

exports.upload = async (req, res) => {

    var file_name = 'Imagen no subida...';
    console.log(file_name)

    if (!req.files) {
        return res.status(400).json({ message: file_name });
    }


    var files = req.files;
    var clotheId = req.params.id;
    var array = new Array();


    for (const key in files) {
        console.log(files[key]);
        var file_path = files[key].path;
        console.log(file_path);
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];
        console.log("File:name", file_name);
        //Comprobar la extension, solo imagenes, si es valida borrar el fichero
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            //Borrar el archivo subido
            fs.unlink(file_path, (err) => {

                return res.status(500).send({
                    message: "At least one image extension is wrong"
                });

            });
        }

        if (clotheId) {
            array.push(file_name);
        }
    }
    if (clotheId && array.length > 0) {
        try {
            const clotheUpdate = await Clothes.updateOne({ _id: clotheId }, { $push: { images: array } });
            return res.status(200).json({ clotheUpdate });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Error saving the image"
            });
        }
    }


}

exports.getFiles = async (req, res) => {

    var { id } = req.params;
    
    const clothe = await Clothes.findOne({ _id: id });
    var array = new Array();
    for (let i = 0; i < clothe.images.length; i++){
        var binaryData = fs.readFileSync(path.resolve("upload/clothes/"+clothe.images[i]));
        var base64 = Buffer.from(binaryData).toString("base64");
        array.push(base64);
    }
    return res.status(200).send({ array });
}
