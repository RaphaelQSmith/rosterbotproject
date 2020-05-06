const SlackBot = require('slackbots'),
      bodyParser = require("body-parser"),
      express = require('express'),
      axios = require('axios');
      dotenv = require('dotenv')
      dotenv.config();

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
    }
}

  function getStaffName(data){
      for(staff of staffList){
        if(staff.slackUser === data.user){
          return staff.name;
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
    for(hol of holidays){
      if(data.user === hol.slackUser){
        bot.postMessageToUser(
          getStaffName(data), 
          `Your Holidays starts at: 
           ${hol.start} and ends: ${hol.finish}`),
           params
      }
    }
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
  var shifts = [
  {
    "date": "2020-05-01",
    "shiftTime": "8am-4pm",
    "slackUser": "UU98UF8AG",
    "staff": "querinosmith",
    "manager": "John Smith",
    "confirmed": true
 },

 {
    "date": "2020-06-20",
    "shiftTime": "4pm-10pm",
    "slackUser": "UU98UF8AG",
    "staff": "querinosmith",
    "manager": "John Smith",
    "confirmed": true
 },
 {
    "date": "2020-05-10",
    "shiftTime": "2pm-8pm",
    "slackUser": "UU98UF8AG",
    "staff": "querinosmith",
    "manager": "John Smith",
    "confirmed": false
 }
]

var holidays = [
  {
    "slackUser": "UU98UF8AG",
    "start": "2020-08-01",
    "finish":"2020-08-30"
  },
  {
    "slackUser": "U******",
    "start": "2020-10-01",
    "finish":"2020-10-30"
  },
  {
    "slackUser": "U*********",
    "start": "2020-12-01",
    "finish":"2020-12-30"
  }
]

var staffList = [
  {
    "slackUser": "UU98UF8AG",
    "name": "querinosmith",
    "department": "Sales"
  }
]