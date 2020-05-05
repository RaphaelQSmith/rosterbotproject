const SlackBot = require('slackbots'),
      bodyParser = require("body-parser"),
      express = require('express'),
      axios = require('axios');
      dotenv = require('dotenv')
      dotenv.config();

// bot name and access token
const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'rosterbot'
  });

  // initialize the app
  bot.on('start', function(){
    var params = {
      icon_emoji: ':smiley:'
    };
  
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
    if(data.text.includes(' /available')){

      const staffUser = data.user;
      console.log(staffUser);
      
      bot.postMessageToUser(shifts[0].staff, shifts[0].date +" "+ shifts[0].shiftTime)
        // availability();
    }else if(data.text.includes(' /holidays')){
        checkHolidays();
    }else if(data.text.includes(' /confirmed')){
        confirmShift();
    }else if(data.text.includes(' /help')){
      help();
    }


function availability(){

    // axios.get(`${process.env.MONGODB_TOKEN}`).then(res =>{
    //     console.log(res.data);
    // });    
        const params = {
          icon_emoji: ':question:'
        };
        bot.postMessageToChannel(
          'roster',
          ` `,
          params
        );
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
         "/confirmed" will show all your confirmed shifts.`,
    params
  );
}
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
    "confirmed": true
 }
 
]

var holidays = [
  {
    "staff": "",
    "start": "2020-08-01",
    "finish":"2020-08-30"
  }
  {
    "staff": "",
    "start": "2020-10-01",
    "finish":"2020-10-30"
  }
  {
    "staff": "",
    "start": "2020-12-01",
    "finish":"2020-12-30"
  }
]
