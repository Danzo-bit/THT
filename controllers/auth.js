const User = require('../models/user')
const registerValidator = require('../validators/register')
const loginValidator = require('../validators/login')

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

    const searchTerm = req.query.q;  //gets filter query from req
    const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // default to 10 items per page if not provided
    const skip = (page - 1) * limit;  //skip params to specify num of documents to skip
  
    try{
    const count = await User.countDocuments({
            $or: [
              { email: { $regex: searchTerm, $options: 'i' } },
            ],
          });

    const dbusers = await User.find(
        {
            $or: [
              { email: { $regex: searchTerm, $options: 'i' } },
            ],
          }
    ) //returns all existing users
    .skip(skip) //skips users in query page
    .limit(limit) //limit of users returned

    const totalPages = Math.ceil(count / limit);

    const users = dbusers.map(user => _.omit(user.toObject(), dbSecretFields))
    return res.status(201).json({
        message: "success",
        totalItems: count,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: limit,
        users: users
    })
    }catch(err){
    res.status(500).json({ message: err.message })
    }
}

exports.login = async(req, res) => {
    // validate request body
    const validationMessage = loginValidator(req.body)
    if(validationMessage !== true){
        return res.status(400).json({message:validation})
    }
    // check if email exist in db
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(404).json({message: 'email does not exist.'})
    }
    // compare password provided to password in db
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if(!isPasswordCorrect){
        return res.status(401).json({message: 'password is not correct.'})
    }

   return res.status(201).json({message: 'you are successfully logged in'})
}