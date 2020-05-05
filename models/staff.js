var mongoose = require("mongoose");

// MongoDB style movie Schema
var staffSchema = new mongoose.Schema({
      slackUser: String,
      name: String,
      department: String
   });
// export model 
   module.exports = mongoose.model('Staff', staffSchema);