//path to help configure module paths
const path = require('path')
//dotenv to keep our props and .env keys secret
const dotenv = require('dotenv')
//mongoose to help connect to our local MongoDB
const mongoose = require('mongoose')
dotenv.config({
    path:path.join(__dirname,'.env')
})
const app = require('./app')
const {PORT,DATABASE_CONNECTION_STRINGS} = require('./configs/properties')

mongoose.connect(
        DATABASE_CONNECTION_STRINGS,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,   
        }
    ).then(
        ()=>{
            console.log('Database connected :)')
    
            app.listen(PORT, ()=>{
                console.log(`SERVER STARTED LISTENING ON PORT ${PORT}...`);
            })
        }
    )
    