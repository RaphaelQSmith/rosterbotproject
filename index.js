// The modules that is required to be install for our bot
const SlackBot = require('slackbots')
      dotenv = require('dotenv') // This module need to be install for the .env file , since that our bot unique token is storing inside .env file
      dotenv.config() //Allow to be access the .env file

// Some require directory path to our shift, staff and holiday database schema      
var ShiftSchema = require('./models/shifts')
    StaffSchema = require('./models/staff')
    HolidaySchema = require('./models/holidays')
var userList = [];
var name = '';

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
  
  // checks and respond to incoming messages ,then calling specific function
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

// Function to display available shifts
  function pickAShift(data){
    var user = data.user 
    for(a of userList){
      if(a.slackUser === user){
        name = a.name;
      }
    }
    // Find available shifts from the database schema then post result back to user
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
   
  // Function to display comfirmed shift
  function myConfirmedShifts(data){
    
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
          
          if(a.slackUser===user){
            bot.postMessageToUser(
              name,
              `Shift assigned: ID - ${id}: 
              ${date} ${time}`,
              params
              );
        }
      }  
    })
  }

 // Function to check staff's holidays
 function checkHolidays(data){  
    var user = data.user 

    for(a of userList){
      if(a.slackUser === user){
        name = a.name;
      }
    }

 // Find the staff's holiday start date to end date in the database holiday schema   
    HolidaySchema.find(
        {"slackUser": `${user}`},
          function (err, holiday){
              for(a of holiday){
                var finish = JSON.stringify(a.finish)  
                var start = JSON.stringify(a.start)
                bot.postMessageToUser( //Display the holidays date period to user on slack
                  name,
                  `Your Holidays starts at: 
                  ${start} and ends: ${finish}`),
                  params  
          }
        }
     )   
  }
  

//Check total working hours function
function checkTotalHours(data){
  var user = data.user
  var totalHours = 0;

// Find working hours in database of shift schema    
  ShiftSchema.find(
    {"slackUser": `${user}`},
    function(err, shifts){
      for(a of shifts){
        if (a.slackUser===data.user){ // check if the user is match to the slack user in the schema  , if it is then adding the working hours.
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

// Function of display help menu
function help(){
  const params = {
    icon_emoji: ':question:'
  };
  bot.postMessageToChannel(
    'roster',
    `Use the following commands:
         "/available" command will display all shifts available at the moment. 
         "/holidays" will show when your holidays are schedule.
         "/myshifts" will show all your confirmed shifts.
         "/hours" displays the total amount of hours scheduled for you`,
    params
  );
}

