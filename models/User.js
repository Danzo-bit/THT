const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    balance: {
        type: Number,
        default: 0
      }    
},{
    timestamps:true
})

const model = mongoose.model("user",schema)

module.exports = model;