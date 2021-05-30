var User = require('../models/User');
var jwt = require('jsonwebtoken');
var constants = require('../constants');

exports.signUp = async (req, res) => {

    const { name, email, password } = req.body;

    const newUser = new User({
        name,
        email,
        password: await User.encryptPassword(password)
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, constants.secretKey, {algorithm:'HS512', expiresIn: 86400 });

    return res.status(200).json({ token: token });
}

exports.signIn = async (req, res) => {

    const userFound = await User.findOne({email:req.body.email});

    if(!userFound){
        return res.status(400).json({message:"User Not Found"});
    }

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);

    if(!matchPassword){
        return res.status(401).json({token: null, message: "Invalid password"});
    }
    
    const token = jwt.sign({ id: userFound._id }, constants.secretKey, {algorithm:'HS512', expiresIn: 86400 });

    return res.status(200).send({token});
}