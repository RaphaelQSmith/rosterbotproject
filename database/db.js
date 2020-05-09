const mongoose = require('mongoose');   

const uri = 'mongodb://raphaelsmith:Tricolor31!@ds239578.mlab.com:39578/heroku_6gvbsfn3'
mongoose.connect(uri, { useNewUrlParser: true })

mongoose.Promise = global.Promise;

module.exports = mongoose;