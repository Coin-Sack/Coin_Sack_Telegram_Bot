/* Coin Sack Telegram Bot */

const fs = require('fs');
const { Telegraf } = require('telegraf');
const cron = require('node-cron');


const LOG = function(command, context=undefined) {
    console.log("> " + (new Date()).toUTCString() + "   " + command.toString());
    if(context != undefined) {
        console.log("        from: " + context.from.username);
        console.log("        chat: " + context.message.chat.type + " " + context.message.chat.id);
    }
    console.log("\n");
}


const bot = new Telegraf(fs.readFileSync('.bottoken').toString());

let contextsGettingUpdates = [];


Telegraf.groupChat([
    bot.command('about', async function(context) {
        LOG("/about", context);
        context.replyWithMarkdown(fs.readFileSync('./replies/about.md').toString());
    }),
    bot.command('website', async function(context) {
        LOG("/website", context);
        context.replyWithMarkdown(fs.readFileSync('./replies/website.md').toString());
    }),
    bot.command('whitepaper', async function(context) {
        LOG("/whitepaper", context);
        context.replyWithMarkdown(fs.readFileSync('./replies/whitepaper.md').toString());
    }),
    bot.command('contract', async function(context) {
        LOG("/contract", context)
        context.replyWithMarkdown(fs.readFileSync('./replies/contract.md').toString());
    }),
    bot.command('socials', async function(context) {
        LOG("/socials", context);
        context.replyWithMarkdown(fs.readFileSync('./replies/socials.md').toString());
    }),
    bot.command('instagram', async function(context) {
        LOG("/instagam", context);
        context.replyWithMarkdown(fs.readFileSync('./replies/instagram.md').toString());
    }),
    bot.command('twitter', async function(context) {
        LOG("/twitter", context);
        context.replyWithMarkdown(fs.readFileSync('./replies/twitter.md').toString());
    }),
    bot.command('github', async function(context) {
        LOG("/github", context);
        context.replyWithMarkdown(fs.readFileSync('./replies/github.md').toString());
    }),
    bot.command('commands', async function(context) {
        LOG("/commands", context);
        context.replyWithMarkdown(fs.readFileSync('./replies/commands.md').toString());
    }),
    bot.command('issue', async function(context) {
        LOG("/issue", context)
        context.replyWithMarkdown(fs.readFileSync('./replies/issue.md').toString());
    })
]);


Telegraf.admin([
    bot.command('start', async function(context) {
        LOG("/start", context);
        var isContextGettingUpdates = false;
        contextsGettingUpdates.forEach(contextGettingUpdates => {
            if(contextGettingUpdates.message.chat.id == context.message.chat.id){
                isContextGettingUpdates = true;
            }
        });
        if(!isContextGettingUpdates){
            contextsGettingUpdates.push(context);
            context.replyWithMarkdown(fs.readFileSync('./replies/start.md').toString());
        }
    }),
    bot.command('stop', async function(context) {
        LOG("/stop", context);
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
            context.replyWithMarkdown(fs.readFileSync('./replies/stop.md').toString());
        }
    })
]);

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


process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));


bot.launch();
LOG("start bot");