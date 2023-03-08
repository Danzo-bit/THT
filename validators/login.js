const Validator = require('fastest-validator')

const v = new Validator()

const schema = {
    email:{
        type:"email"
    },
    password:{
        type: "string",
        min: 8,
        max: 20,
    },
    $$strict:true
}

const checker = v.compile(schema)

module.exports = checker