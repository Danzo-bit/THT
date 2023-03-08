const Validator = require('fastest-validator')
const v = new Validator()

const schema = {
    firstname:{
        type: "string",
        min:3,
        max:100
    },
    lastname:{
        type: "string",
        min:3,
        max:100
    },
    email:{
        type: "email",
        label: "Email Address"
    },
    password: {
        type: "string",
        min: 8,
        max: 20,
        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/gm,
    },  
    $$strict:true
}

const checker = v.compile(schema)

module.exports = checker