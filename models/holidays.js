// Require directory path to our db.js
const mongoose = require('../database/db')

// MongoDB style Staff Schema
var holidaySchema = new mongoose.Schema({
      slackUser: String,
      start: String,
      finish: String
   });
// export model 
   module.exports = mongoose.model('Holiday', holidaySchema);