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
    }else if(data.text.includes(' /hours')){
      checkTotalHours(data);
    }else if(data.text.includes(' /available')){
      pickAShift(data);
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
// increment ID
function newID(){
  
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

/**
 * 
 * @yanjuehau 
 */  
//Check total hours function , still developing.......
function checkTotalHours(data){
    const shift = shifts;
  
    shift.forEach(function(d){

            if(holder.hasOwnProperty(d.slackUser)){
                 holder[d.slackUser] = holder[d.slackUser] + d.hours;

             } else {
                 holder[d.slackUser] = d.hours;

            }
                   
        });

            var obj2 = [] ;
                

            for (var prop in holder) {
                obj2.push({ slackUser: prop, hours: holder[prop]});
                 result = obj2.toString();
                    
            }

             bot.postMessageToUser(getStaffName(data),
            `Your total working hours are :  ${obj2} `)
  
            console.log(obj2);

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
      "id": 1,
      "hours": 8,
      "date": "2020-05-01",
      "shiftTime": "8am-4pm",
      "slackUser": "UU98UF8AG",
      "staff": "querinosmith",
      "manager": "John Smith",
      "confirmed": true
  },

  {
      "id": 2,
      "hours": 8,
      "date": "2020-06-20",
      "shiftTime": "4pm-10pm",
      "slackUser": "UU98UF8AG",
      "staff": "querinosmith",
      "manager": "John Smith",
      "confirmed": true
  },
  {
      "id": 3,
      "hours": 8,
      "date": "2020-05-13",
      "shiftTime": "2pm-8pm",
      "slackUser": "UU98UF8AG",
      "staff": "querinosmith",
      "manager": "John Smith",
      "confirmed": false
  },
  {
      "id": 4,
      "hours": 8,
      "date": "2020-05-13",
      "shiftTime": "2pm-10pm",
      "slackUser": "",
      "staff": "",
      "manager": "John Smith",
      "confirmed": false
  },
  {
      "id": 5,
      "hours": 8,
      "date": "2020-05-13",
      "shiftTime": "8am-3pm",
      "slackUser": "",
      "staff": "",
      "manager": "John Smith",
      "confirmed": false
  },
  {
      "id": 6,
      "hours": 8,
      "date": "2020-05-12",
      "shiftTime": "10am-6pm",
      "slackUser": "",
      "staff": "",
      "manager": "John Smith",
      "confirmed": false
  },
  {
      "id": 7,
      "hours": 8,
      "date": "2020-05-10",
      "shiftTime": "1pm-9pm",
      "slackUser": "",
      "staff": "",
      "manager": "John Smith",
      "confirmed": false
  },
  {
      "id": 8,
      "hours": 8,
      "date": "2020-05-11",
      "shiftTime": "4pm-10pm",
      "slackUser": "",
      "staff": "",
      "manager": "John Smith",
      "confirmed": false
  },
  {
      "id": 9,
      "hours": 8,
      "date": "2020-05-09",
      "shiftTime": "8am-16pm",
      "slackUser": "",
      "staff": "",
      "manager": "John Smith",
      "confirmed": false
  },
  {
    "id": 10,
    "hours": 8,
    "date": "2020-05-20",
    "shiftTime": "4m-10pm",
    "slackUser": "",
    "staff": "",
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
