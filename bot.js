/* Coin Sack Telegram Bot */

/* To-do:
    - add timed updates messages
    - automatic welcome messages
    - 

*/

const fs = require('fs');
const { Telegraf } = require('telegraf');
const cron = require('node-cron');

const bot = new Telegraf(process.env.BOT_TOKEN);

let botContext = undefined;

bot.command('start', context => {
    context.reply("Hello, I'm the Coin Sack bot.\n\nIt is good to be alive!");
    context.reply("Use my commands to get up-to-date information about Coin Sack:\n\n/about - view up to date information about Coin Sack\n/website - view the Coin Sack website\n/contract - view the Coin Sack smart contract address\n/whitepaper - read the Coin Sack whitepaper\n/commands - view a list of my commands");

    if(botContext == undefined){
       botContext = context;
    }
});

bot.command('website', context => {
    context.reply("The Coin Sack Website:");
    context.reply("https://coin-sack.com/");
});

bot.command("contract", context => {
    context.reply("The Coin Sack Smart Contract:");
    context.reply("0x125Ce3f13950C5fA94397927F88C352FdED680Ad\nhttps://bscscan.com/token/0x125Ce3f13950C5fA94397927F88C352FdED680Ad");
});

bot.command("whitepaper", context => {
    context.reply("Read The Coin Sack Whitepaper:");
    context.reply("https://www.coin-sack.com/whitepaper");
})

bot.command("about", context => {
    context.reply(fs.readFileSync('./replies/about.txt').toString());
});

bot.command("commands", context => {
    context.reply("Use my commands to get up-to-date information about Coin Sack:\n\n/about - view up to date information about Coin Sack\n/website - view the Coin Sack website\n/contract - view the Coin Sack smart contract address\n/whitepaper - read the Coin Sack whitepaper\n/commands - view a list of my commands");
})

bot.launch();

cron.schedule('10 3,6,9,12,15,18,21 * * *', () => {
  botContext.telegram.sendMessage(botContext.message.chat.id, fs.readFileSync('./updates/1.txt').toString());
});

cron.schedule('20 4,7,10,13,16,19,22 * * *', () => {
  botContext.telegram.sendMessage(botContext.message.chat.id, fs.readFileSync('./updates/2.txt').toString());
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));