/* Coin Sack Telegram Bot */


// Import Dependencies
const fs = require('fs');
const { Telegraf } = require('telegraf');
const cron = require('node-cron');


// Create Bot
const bot = new Telegraf(fs.readFileSync('.bottoken').toString());
bot.use(Telegraf.log());


// Handle Recurring Updates
let contextsGettingUpdates = [];
let lastChosenUpdate = undefined;
const sendContextUpdates = function() {
    LOG("schedule recurring updates");
    var possibleUpdates = [];
    fs.readirSync('./updates').forEach((updateFile) => {
        possibleUpdates.push(updateFile);
    });

    var chosenUpdate = undefined; 
    while(chosenUpdate == undefined || chosenUpdate == lastChosenUpdate){
        chosenUpdate = possibleUpdates[Math.floor(Math.random()*possibleUpdates.length)];
    }
    var updateText = fs.readFileSync(chosenUpdate).toString();
    contextsGettingUpdates.forEach((context) => {
        setTimeout(() => {
            context.replyWithMarkdown(updateText);
        }, Math.random()*1000*60*20);
    });
}
cron.schedule('5 7,10,13,16,19,22 * * *', sendContextUpdates);


// Bot Commands
bot.command('about', Telegraf.groupChat(context => {
    context.replyWithMarkdown(fs.readFileSync('./replies/about.md').toString());
}));

bot.command('website', Telegraf.groupChat(context => {
    context.replyWithMarkdown(fs.readFileSync('./replies/website.md').toString());
}));

bot.command('whitepaper', Telegraf.groupChat(context => {
    context.replyWithMarkdown(fs.readFileSync('./replies/whitepaper.md').toString());
}));

bot.command('contract', Telegraf.groupChat(context => {
    context.replyWithMarkdown(fs.readFileSync('./replies/contract.md').toString());
}));

bot.command('socials', Telegraf.groupChat(context => {
    context.replyWithMarkdown(fs.readFileSync('./replies/socials.md').toString());
}));

bot.command('instagram', Telegraf.groupChat(context => {
    context.replyWithMarkdown(fs.readFileSync('./replies/instagram.md').toString());
}));

bot.command('twitter', Telegraf.groupChat(context => {
    context.replyWithMarkdown(fs.readFileSync('./replies/twitter.md').toString());
}));

bot.command('github', Telegraf.groupChat(context => {
    context.replyWithMarkdown(fs.readFileSync('./replies/github.md').toString());
}));

bot.command('commands', Telegraf.groupChat(context => {
    context.replyWithMarkdown(fs.readFileSync('./replies/commands.md').toString());
}));

bot.command('issue', Telegraf.groupChat(context => {
    context.replyWithMarkdown(fs.readFileSync('./replies/issue.md').toString());
}));


bot.command('start', Telegraf.admin(context => {
    var isContextGettingUpdates = false;
    contextsGettingUpdates.forEach(contextGettingUpdates => {
        if(contextGettingUpdates.message.chat.id == context.message.chat.id){
            isContextGettingUpdates = true;
        }
    });
    if(!isContextGettingUpdates){
        contextsGettingUpdates.push(context);
    }
    context.replyWithMarkdown(fs.readFileSync('./replies/start.md').toString());
}));

bot.command('stop', Telegraf.admin(context => {
    var isContextGettingUpdates = false;
    var contextGettingUpdatesIndex = 0;
    contextsGettingUpdates.forEach((contextGettingUpdates, index) => {
        if(contextGettingUpdates.message.chat.id == context.message.chat.id){
            isContextGettingUpdates = true;
            contextGettingUpdatesIndex = index;
        }
    });
    if(isContextGettingUpdates){
        contextsGettingUpdates.splice(contextGettingUpdatesIndex, 1);
    }
    context.replyWithMarkdown(fs.readFileSync('./replies/stop.md').toString());
}));


// Gracefully Deal With Shutdowns
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));


// Launch Bot
bot.launch();
