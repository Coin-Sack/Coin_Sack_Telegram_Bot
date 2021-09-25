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
let possibleUpdates = [];
fs.readdirSync('./updates').forEach((updateFile) => {
    console.log(updateFile.toString())
    possibleUpdates.push(updateFile.toString());
});
cron.schedule('25 */3 * * *', () => {
    var chosenUpdate = undefined; 
    do {
        chosenUpdate = possibleUpdates[Math.floor(Math.random()*possibleUpdates.length)];
    } while(chosenUpdate == lastChosenUpdate);
    lastChosenUpdate = chosenUpdate;
    var updateText = fs.readFileSync('./updates/' + chosenUpdate).toString();
    contextsGettingUpdates.forEach(context => {
        context.telegram.sendMessage(context.message.chat.id, updateText);
    });
});


// Group Chat Commands
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

bot.command('token', Telegraf.groupChat(context => {
    context.replyWithMarkdown(fs.readFileSync('./replies/contract.md').toString());
}));

bot.command('price', Telegraf.groupChat(context => {
    context.replyWithMarkdown(fs.readFileSync('./replies/price.md').toString());
}));

bot.command('presale', Telegraf.groupChat(context => {
    context.replyWithMarkdown(fs.readFileSync('./replies/presale.md').toString());
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


// Group Chat Event Handlers
bot.on("new_chat_members", Telegraf.groupChat(context => {
    const hellos = ["Hello", "Hi", "Howdy", "Bonjour", "Salut", "Hello there", "Hola", "Guten Tag", "Namaste", "Shalom", "Hi there", "Greetings", "Wassuh dude", "Wassuh bruh", "Heyo", "Hey there", "Yo", "Sup", "Hey"];
    const punctuations = [String.fromCodePoint(0x1F600), String.fromCodePoint(0x1F603), String.fromCodePoint(0x1F604), String.fromCodePoint(0x1F601), String.fromCodePoint(0x1F642), String.fromCodePoint(0x1F60A), String.fromCodePoint(0x1F920), String.fromCodePoint(0x1F60E), String.fromCodePoint(0x1F913), String.fromCodePoint(0x1F919), String.fromCodePoint(0x1F44B)];
    var reply = hellos[Math.floor(Math.random()*hellos.length)] + " " + punctuations[Math.floor(Math.random()*punctuations.length)] +"\n";
    context.message.new_chat_members.forEach((new_chat_member) => {
        if(new_chat_member.username != undefined){
            reply += ("\n@"+new_chat_member.username+"\n");
        } else if(new_chat_member.first_name != undefined){
            reply += ("\n@"+new_chat_member.first_name+"\n");
        }
    });
    const closers = ["We're so glad you're here!", "We're so happy you made it!", "We're so happy to see you!", "It's great to have you!", "It's awesome that you're here!"];
    reply += ("\nWelcome to the Coin Sack Telegram chat! "+closers[Math.floor(Math.random()*closers.length)]);
    context.reply(reply);
}));

//bot.on("voice_chat_scheduled", Telegraf.groupChat(context => {

//}));

//bot.on("voice_chat_started", Telegraf.groupChat(context => {

//}));

//bot.on("voice_chat_ended", Telegraf.groupChat(context => {

//}));


// Group Chat Admin Commands
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


// Private Chat Commands
bot.command('start', Telegraf.privateChat(context => {
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

bot.command('stop', Telegraf.privateChat(context => {
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


bot.help(context => {
    context.replyWithMarkdown(fs.readFileSync('./replies/commands.md').toString());
});

// Launch Bot
bot.launch();


// Gracefully Deal With Shutdowns
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
