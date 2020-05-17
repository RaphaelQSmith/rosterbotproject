//Require module , using mongoose to manage relationships between data, provides schema validation and the representation of those objects in MongoDB
const mongoose = require('mongoose');   

//URI that from mongodb mlab , allow us to use mongoose to connect our bot with it 
const uri = 'mongodb://raphaelsmith:Tricolor31!@ds239578.mlab.com:39578/heroku_6gvbsfn3'
mongoose.connect(uri, { useNewUrlParser: true })

mongoose.Promise = global.Promise;

//Export module
module.exports = mongoose;