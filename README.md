# The Coin Sack Telegram Bot

This repo contains source code for the Coin Sack project's Telegram bot (@coin_sack_bot). The bot is built on top of Node JS using the Telegraf package.

[See this bot in action... Join the Coin Sack Telegam group today!](https://t.me/joinchat/hB6xA3apOXg2ZjBh)


---


## Bot Commands & Functions

### Automated Recurring Updates


### Group Chat Features
@coin_sack_bot can be added to any Telegram group to provide Coin Sack information & automatic recurring updates. 

The following commands are avalible to all group members:
* /about - view up to date, general project information
* /website - get a link to the project's website
* /whitepaper - download & read the project's whitepaper
* /contract - view the CS smart contract on the BSC Mainnet
* /socials - get a list of all Coin Sack social medias
* /instagram - get a link to the Coin Sack Instagram
* /twitter - get a link to the Coin Sack Twitter
* /github - get a link to the Coin Sack GitHub
* /commands - view a list of avalible commands
* /issue - submit a bot feature request or bug report

Group administrators additionally have access to these other commands for enabling / disabling automatic recurring updates:
* /startupdates - start recieving automated project updates via private chat
* /stopupdates - stop recieving automated project updates via private chat

More group chat commands / features are currently under development. 


### Private Chat Features
Any Telegram user can directly open up a private chat with @coin_sack_bot to get information about or recurring updates regarding Coin Sack. 

The following commands are avalible to private chat users:
* /startupdates - start recieving automated project updates via private chat
* /stopupdates - stop recieving automated project updates via private chat

More private commands / features are currently under development.


### Direct Message Management
Administrators from the Coin Sack project will be able to manage the bot through a direct message interface by opening a private chat with @coin_sack_bot. 

This feature is currently under development.


---


## Bot Source
Bot source code can be found within the `bot.js` file at this project's root. 

The packages `Telegraf` and `node-cron` are included as dependencies.
* [Telegraf](https://telegraf.js.org/index.html) - a library that makes it simple to develop Telegram bots using JavaScript providing access to Telegram APIs
* [node-cron](https://nodecron.com/) - a simple cron-like job scheduler for Node.js used for scheduling and dispatching of automatic recurring updates

The bot's token is imported from a `.bottoken` file at the projects's root. This file is excuded from this GitHub release for obvious security reasons.

Bot replies are loaded at runtime from markdown (.md) files stored in the `replies` subdirectory. Content for automated recurring updates is likewise loaded from the `updates` directory. Markdown syntax follows Telegram's V1 specification.

>#### From the Telegram Docs:
>https://core.telegram.org/bots/api#markdown-style
>
> This is a legacy mode, retained for backward compatibility. To use this mode, pass Markdown in the parse_mode field. Use the following syntax in your message:

    *bold text*
    _italic text_
    [inline URL](http://www.example.com/)
    [inline mention of a user](tg://user?id=123456789)
    `inline fixed-width code`
    ```
    pre-formatted fixed-width code block
    ```
    ```python
    pre-formatted fixed-width code block written in the Python programming language
    ```

All bot replies and updates are written using Telegram's V1 markdown syntax only; their V2 Markdown syntax has not been integrated yet.

Telegraf middleware is used for permission handeling during command processing. Bot source code responsible for handling commands is roughly broken down into sections, seperated by whitespace / comments, and sorted by the middleware used.

Group chat commands use the `Telegraf.groupChat()` middleware to ensure that group chat commands recieve the correct replies. 

Group chat administrator commands use the `Telegraf.admim()` middleware preventing normal group members from accessing them.

Private chat commands use the `Telegraf.privateChat()` middleware to ensure that private chat commands recieve the correct replies.

Automatic recurring updates are scheduled using `node-cron`. Update content is picked randomly from avalible updates in such a way as to prevent the same update from being sent back to back.

Process listeners for `SIGINT` and `SIGTERM` are setup to gracefully deal with application shutdowns.


---


## Bot Development
This Telegram bot is still very much in beta and under continuing development. Please feel free to contribute to this repository by submitting a pull request with your code changes. 

Feature requests and bug reports can also be submitted via [this repository's issues page](https://github.com/Coin-Sack/Coin_Sack_Telegram_Bot/issues/new).

---


## The Coin Sack Project
Coin Sack was created with the belief that there need to be stronger, more trustworthy, and more worthwhile projects built throughout the deFi space. We decided to take this into our own hands by launching Coin Sack; a BEP-20 token featuring battle tested tokenomics, an innovative future roadmap, and a trustworthy team that cares for its investors.

Check out the Coin Sack project online at [Coin-Sack.com](https://coin-sack.com/)!