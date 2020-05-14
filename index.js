const SlackBot = require('slackbots'),
      bodyParser = require("body-parser"),
      express = require('express'),
      axios = require('axios');
      dotenv = require('dotenv')
      dotenv.config()
var ShiftSchema = require('./models/shifts')
    StaffSchema = require('./models/staff')
    HolidaySchema = require('./models/holidays')

// bot name and access token
const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'myroster'
  });
  const params = {
    icon_emoji: ':robot_face:'
  };
  // initialize the app
  bot.on('start', function(){  
    bot.postMessageToChannel(
      'roster',
      "I'm available. Ask me about your shift...",
      params
    );
  });
  // error handler
  bot.on('error', (err)=>
    console.log(err)
    );
  // message handler  
  bot.on('message', (data)=>{
    if(data.type !== 'message'){
        return;
    }
    messageHandler(data);
  });
  // checks and respond to incoming messages
  function messageHandler(data){
    if(data.text.includes(' /myshifts')){
      myConfirmedShifts(data);
    }else if(data.text.includes(' /holidays')){
        checkHolidays(data);
    }else if(data.text.includes(' /help')){
      help();
    }else if(data.text.includes(' /hours')){
      checkTotalHours(data);
    }else if(data.text.includes(' /available')){
      pickAShift(data);
    }else if(data.text.includes(' /select')){
      selectShift(data);
    }
}
// get user name from the staff list
function getStaffName(data){
  for(staff of staffList){
    if(staff.slackUser === data.user){
      return staff.name;
    }
  }
}

// display available shifts
function pickAShift(data){
    for(shift of shifts){
      if(shift.slackUser===""){
        bot.postMessageToUser(
            getStaffName(data),
            `Available shift ID - ${shift.id}: 
             ${shift.date} ${shift.shiftTime}`,
            params
            );
      }
    }
  }

  function myConfirmedShifts(data){
    const staffUser = data.user;
      console.log(staffUser);
      var total = 0;
      for(shift of shifts){
        if (shift.slackUser===staffUser & shift.confirmed===true) {
          total += 1;
          bot.postMessageToUser(
            shift.staff,
            `Confirmed shift ${total}: 
             ${shift.date} ${shift.shiftTime}`,
            params
            );          
        }
      }
      if(total===0){
        bot.postMessageToUser(
          getStaffName(data), 
          "No shifts found", 
          params);
        }  
      }

  function checkHolidays(data){  
    var user = data.user 
    hol =  HolidaySchema.find(
        {"slackUser": `${user}`},
          function (err, holiday){
              for(a of holiday){
              var finish = JSON.stringify(a.finish)  
              var start = JSON.stringify(a.start)
              bot.postMessageToUser(
                "querinosmith",
                `Your Holidays starts at: 
                ${start} and ends: ${finish}`),
                params  
          }
        }
     )   
  }
  
/**
 * 
 * @yanjuehau 
 */  
//Check total hours function , still developing.......
function checkTotalHours(data){

  var totalHours = 0;
    for(shift of shifts){
      if (shift.slackUser===data.user){
        totalHours = totalHours + shift.hours;
      }
    }; 
  
    bot.postMessageToUser(getStaffName(data),
       `Your total working hours are : ${totalHours} `) 
  
  }

function help(){
  const params = {
    icon_emoji: ':question:'
  };
  bot.postMessageToChannel(
    'roster',
    `Use the following commands:
         "/available" command to let your manager know when you wanna work. 
         "/holidays" command will show when your holidays are schedule.
         "/myshifts" will show all your confirmed shifts.`,
    params
  );
}

// var holidays = [
  
//   {
//     "slackUser": "U******",
//     "start": "2020-10-01",
//     "finish":"2020-10-30"
//   },
//   {
//     "slackUser": "U*********",
//     "start": "2020-12-01",
//     "finish":"2020-12-30"
//   }
// ]

