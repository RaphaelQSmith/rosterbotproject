//Require module , using mongoose to manage relationships between data, provides schema validation and the representation of those objects in MongoDB
const mongoose = require('mongoose');   
dotenv = require('dotenv') // This module need to be install for the .env file , since that our bot unique token is storing inside .env file
      dotenv.config()

//URI that from mongodb mlab , allow us to use mongoose to connect our bot with it 
const uri = `${process.env.MONGODB_TOKEN}` 
mongoose.connect(uri, { useNewUrlParser: true })

mongoose.Promise = global.Promise;

//Export module
module.exports = mongoose;