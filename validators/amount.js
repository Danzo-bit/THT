const Validator = require('fastest-validator')
const v = new Validator()

const schema = {
    amount:{ type: "number", positive: true, integer: true },  
    $$strict:true
}

const checker = v.compile(schema)

module.exports = checker