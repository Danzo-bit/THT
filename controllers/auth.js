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

exports.users = async (req, res) => {

    const page = parseInt(req.query.page) || 1; // Current page number (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Number of items per page (default: 10)
  
    try{
    const dbusers = await User.find() //returns all existing users
                        .skip((page - 1) * limit) //skips users in query page
                        .limit(limit) //limit of users returned

    const users = dbusers.map(user => _.omit(user.toObject(), dbSecretFields))
    return res.status(201).json({
        message: "success",
        page:req.query.page || 1,
        users: users
    })
    }catch(err){
    res.status(500).json({ message: err.message })
    }
}