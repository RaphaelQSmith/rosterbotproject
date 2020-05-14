# rosterbotproject
Slack bot application created for third-year project in an IT graduation course.

Created by:
    Raphael Smith, Narcisus Perejan, Yanjue Hau, Fangbo Li

Project Supervisor:
    Mikhail Timofeev

Tools and applications currently being used on the project:

* Initial Stage
- Slack Documentation and Dev Tools: https://api.slack.com/start
- Slackbot API: https://github.com/mishk0/slack-bot-api
- Node.js: https://nodejs.org/en/

* Final Stage (Database Connection)
- MongoDB Atlas: https://account.mongodb.com/
- Mongoose: https://www.npmjs.com/package/mongoose  

# How we start to build 
After we had gathered some useful resources for creating the slack bot , we started to build it with creating a testing bot for our own testing purposes just to see how it works, then we started to implement it into our main Slack's Roster Bot here.

# Phases for building the bot

* Phase one (Creating a basic app bot first)
1. We have created a Slack's app (RosterBot) inside the Slack platform then added it into a workspace ,then created a bot integration      to integrate with our app.
2. In order to activate the bot, we have installed all the packages that we need especially slackbot package, then we have been using      the private unique token from the bot integration and store it inside our code therefore we'll be be able to invoke the bot once we      run our code.
3. Before we run it , we have added the Rosterbot app and the bot that to intergrate with inside the same room of channel.
  
* Phase two (Creating and testing our Rosterbot's functionalities)
1. We outlined all our main functionalities before we starting to implement all the functions for the bot.
2. The first function we have created for the bot is to printing the help menu on slack when the user calling the bot and type for          /help, this function will show that what kind of functions available in this rosterbot.
3. The second function we have created for the bot is to retrieve the data of the staff's comfirmed shift and printing it back on slack    for the user.  
4. The third function we have created for the bot is to retrieve the data of the staff's total working hours and printing it back on        slack for the user.
4. The fourth function we have created for the bot is to 

* Phase three ()
1. After we have most of our method functions ready ,we starting to implement the mongodb atlas into our Rosterbot.
3. We register an account 
2. We have created a serverless database in this Rosterbot , it allow us to retrieve and send data in more flexible ways.
3. A huge advantage to us for being using the mongodb atlas as our database , is that we don't have worry about to create a database        that require those specific unique keys to associate with by our self.
