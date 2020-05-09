const mongoose = require('../database/db')
// MongoDB style movie Schema
var shiftSchema = new mongoose.Schema({
      date: String,
      shiftTime: String,
      slackUser: String,
      staff: String,
      manager: String,
      confirmed: Boolean
   });
// export model 
   module.exports = mongoose.model('Shift', shiftSchema);