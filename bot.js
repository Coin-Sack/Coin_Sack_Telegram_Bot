/* Coin Sack Telegram Bot */

const fs = require('fs');
const { Telegraf } = require('telegraf');
const cron = require('node-cron');


const LOG = function(message) {
    console.log((new Date()).toUTCString() + "    " + message.toString());
}


const bot = new Telegraf(fs.readFileSync('.bottoken').toString());

let contextsGettingUpdates = [];


// Global Bot Commands
bot.command('about', async function(context) {
    context.reply(fs.readFileSync('./replies/about.txt').toString());
})
bot.command('website', async function(context) {
    context.reply(fs.readFileSync('./replies/website.txt').toString());
});
bot.command('whitepaper', async function(context) {
    context.reply(fs.readFileSync('./replies/whitepaper.txt').toString());
});
bot.command('roadmap', async function(context) {
    context.reply(fs.readFileSync('./replies/roadmap.txt').toString());
});
bot.command('instagram', async function(context) {
    context.reply(fs.readFileSync('./replies/instagram.txt').toString());
});
bot.command('twitter', async function(context) {
    context.reply(fs.readFileSync('./replies/twitter.txt').toString());
});
bot.command('github', async function(context) {
    context.reply(fs.readFileSync('./replies/github.txt').toString());
});
bot.command('token', async function(context) {
    context.reply(fs.readFileSync('./replies/token.txt').toString());
});
bot.command('price', async function(context) {
    context.reply(fs.readFileSync('./replies/price.txt').toString());
});
bot.command('contract', async function(context) {
    context.reply(fs.readFileSync('./replies/contract.txt').toString());
});
bot.command('issue', async function(context) {
    context.reply(fs.readFileSync('./replies/issue.txt').toString());
});


// Group Chat Specific Bot Commands
bot.groupChat([
    bot.command('socials', async function(context) {
        context.reply(fs.readFileSync('./replies/group/socials.txt').toString());
        log("Get Socials (group chat)");
    }),
    bot.command('commands', async function(context) {
        context.reply(fs.readFileSync('./replies/group/commands.txt').toString());
        LOG("Get Commands (group chat)");
    }),
    bot.admin([
        bot.command('start-updates', async function(context) {
            var isContextGettingUpdates = false;
            contextsGettingUpdates.forEach(contextGettingUpdates => {
                if(contextGettingUpdates.message.chat.id == context.message.chat.id){
                    isContextGettingUpdates = true;
                }
            });
            if(!isContextGettingUpdates){
                contextsGettingUpdates.push(context);
                context.reply(fs.readFileSync('./replies/group/start-updates.txt'));
                LOG("Start Scheduled Updates (group chat)");
            }
        }),
        bot.command('stop-updates', async function(context) {
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
                context.reply(fs.readFileSync('./replies/group/stop-updates.txt'));
                LOG("Stop Scheduled Updates (group chat)");
            }
        })
    ])
]);


// Private Chat Specific Bot Commands
bot.privateChat([
    bot.command('socials', async function(context) {
        context.reply(fs.readFileSync('./replies/private/socials.txt').toString());
        LOG("Get Socials (private chat)");
    }),
    bot.command('tetegram', async function(context) {
        context.reply(fs.readFileSync('./replies/private/telegram.txt').toString());
        LOG("Get Telegram (private chat)")
    }),
    bot.command('commands', async function(context) {
        context.reply(fs.readFileSync('./replies/private/commands.txt').toString());
        LOG("Get Commands (private chat)")
    }),
    bot.command('start-updates', async function(context) {
        var isContextGettingUpdates = false;
        contextsGettingUpdates.forEach(contextGettingUpdates => {
            if(contextGettingUpdates.message.chat.id == context.message.chat.id){
                isContextGettingUpdates = true;
            }
        });
        if(!isContextGettingUpdates){
            contextsGettingUpdates.push(context);
            context.reply(fs.readFileSync('./replies/private/start-updates.txt'));
            LOG("Start Scheduled Updates (private chat)");
        }
    }),
    bot.command('stop-updates', async function(context) {
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
            context.reply(fs.readFileSync('./replies/private/stop-updates.txt'));
            LOG("Stop Scheduled Updates (private chat)");
        }
    })
]);


const sendContextUpdates = function() {
    LOG("Send Scheduled Updates");
    var possibleUpdates = [];
    fs.readirSync('./updates').forEach((updateFile) => {
        possibleUpdates.push(updateFile);
    });

    var chosenUpdate = possibleUpdates[Math.floor(Math.random()*possibleUpdates.length)];
    var updateText = fs.readFileSync(chosenUpdate).toString();
    contextsGettingUpdates.forEach((context) => {
        setTimeout(() => {
            context.telegram.sendMessage(context.message.chat.id, updateText);
        }, Math.random()*1000*60*20);
    });
}

cron.schedule('5 7,10,13,16,19,22 * * *', sendContextUpdates);


process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));


bot.launch();
LOG("Start Telegram Bot");