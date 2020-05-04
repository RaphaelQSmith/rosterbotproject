const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config()

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
      
      const staff = data.user;
      console.log(staff)
      userName = bot.getUserById(staff)
      console.log(userName)
      bot.postMessageToUser(userName, 'hello')
        // availability();
    }
    // else if(message.includes(' /holidays')){
    //     checkHolidays();
    // }else if(message.includes(' /confirmed')){
    //     confirmShift();
    // }else if(message.includes(' /help')){
    //   help();
    // }
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