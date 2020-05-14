const SlackBot = require('slackbots')
      dotenv = require('dotenv')
      dotenv.config()
var ShiftSchema = require('./models/shifts')
    StaffSchema = require('./models/staff')
    HolidaySchema = require('./models/holidays')
var userList = [];

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
    getStaffName();
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
function getStaffName() {
    StaffSchema.find(
        // {"slackUser": `${user}`},
        function(err, staff){
          for(a of staff){
            userList.push(a)
          }
        }
    )   
}

// display available shifts
  function pickAShift(data){
    var user = data.user 
    for(a of userList){
      if(a.slackUser === user){
        name = a.name;
      }
    }

    ShiftSchema.find(
      function(err, shifts){
        for(a of shifts){
          var id = JSON.stringify(a.id)
          var date = JSON.stringify(a.date)  
          var time = JSON.stringify(a.shiftTime)
          bot.postMessageToUser(
            name,
            `Available shift ID - ${id}: 
             ${date} ${time}`,
            params
            );
        }
      }
    )
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
    for(a of userList){
      if(a.slackUser === user){
        name = a.name;
      }
    }

    HolidaySchema.find(
        {"slackUser": `${user}`},
          function (err, holiday){
              for(a of holiday){
                var finish = JSON.stringify(a.finish)  
                var start = JSON.stringify(a.start)
                bot.postMessageToUser(
                  name,
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
  var user = data.user
  var totalHours = 0;

  ShiftSchema.find(
    {"slackUser": `${user}`},
    function(err, shifts){
      for(a of shifts){
        if (a.slackUser===data.user){
          totalHours = totalHours + a.hours;
        }
        var hours = JSON.stringify(totalHours)  
    }
    bot.postMessageToUser(
      name,
      `Your total working hours are : ${hours} `,
      params )
  }
  )
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

