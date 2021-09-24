/* Coin Sack Telegram Bot */

const fs = require('fs');
const { Telegraf } = require('telegraf');
const cron = require('node-cron');
const { send } = require('process');

const bot = new Telegraf(process.env.BOT_TOKEN);

let updateContexts = [];

bot.command('about', context => {
    context.reply(fs.readFileSync('./replies/about.txt').toString());
})

bot.command('website', context => {
    
});

bot.command('whitepaper', context => {
    
});

bot.command('roadmap', context => {

});

bot.command('socials', context => {

});

bot.command('instagram', context => {

});

bot.command('twitter', context => {

});

bot.command('github', context => {

});

bot.command('token', context => {

});

bot.command('price', context => {

});

bot.command('contract', context => {

});

bot.command('introduce', context => {

});

bot.command('start', context => {
    
});

bot.command('stop', context => {

});

bot.command("commands", context => {
    
});

bot.command("issue", context => {

});


bot.launch();


const sendContextUpdates = function() {
    var possibleUpdates = [];
    fs.readirSync('./updates').forEach((updateFile, index) => {
        possibleUpdates.push(fs.readFileSync(updateFile).toString());
    });

    var chosenUpdate = possibleUpdates[Math.floor(Math.random()*possibleUpdates.length)];

    updateContexts.forEach((context) => {
        context.telegram.sendMessage(context.message.chat.id, chosenUpdate);
    });
}

cron.schedule('6 7,18,23 * * *', sendContextUpdates);
cron.schedule('53 10,21 * * *', sendContextUpdates);
cron.schedule('27 12,15 * * *', sendContextUpdates);

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));