const User = require('../models/user')
const registerValidator = require('../validators/register')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const {dbSecretFields} = require('../configs/properties')

exports.register = async (req, res) => {
    
    //validate request body
    const validationMessage = registerValidator(req.body)
    if(validationMessage !== true){
        return res.status(400).json({message: validationMessage})
    }
    
    //check if unique email exists in database
    const existingUser =await User.findOne({email: req.body.email})
    if(existingUser){
        return res.status(409).json({message: `user with email:${req.body.email} already exist.`})
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    //create new user in db
    const user = await User.create({...req.body, password:hashedPassword})

    //send successful response.
    return res
        .status(201)
        .json({
            message: "you are registered successfully",
             user: _.omit(user.toObject(),dbSecretFields)
            })
        
}