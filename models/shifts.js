// Require directory path to our db.js
const mongoose = require('../database/db')

// MongoDB style Staff Schema
var shiftSchema = new mongoose.Schema({
      id: Number,
      hours: Number,
      date: String,
      shiftTime: String,
      slackUser: String,
      staff: String,
      manager: String,
      confirmed: Boolean
   });
// export model 
   module.exports = mongoose.model('Shift', shiftSchema);