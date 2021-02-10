const Discord = require('discord.js');
const config = require("./config.json");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const path = require('path');
const LapisEmoji = require("./emoji.json");

bot.on("guildMemberAdd", member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'general')
    welcomeChannel.send (`Welcome! ${member}`)
})

bot.on('ready', () => {
    console.log('Bot Now connected!');
    console.log('Logged In as', bot.user.tag)
    bot.user.setStatus('online'); // online, idle, invisible, dnd
    bot.user.setActivity("In develop ?help"); 
    console.log('Bot status: ', bot.user.presence.status);
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

var p = "./commands"
fs.readdir(p, function (err, files) {
    if (err) {
        throw err;
    }

    files.map(function (file) {
        return path.join(p, file);
    }).filter(function (file) {
        return fs.statSync(file).isDirectory();
    }).forEach(function (file) {
        var ruta = file.replace("\\","/")
        let directory =`./${ruta}/`
        console.log(directory);
        fs.readdir(directory, (err, files) => {

            if(err) console.log(err)
            console.log(files)
            let jsfile = files.filter(f => f.split(".").pop() === "js") 
            if(jsfile.length <= 0) {
                 return console.log("[LOGS] Couldn't Find Commands!");
            }
        
            jsfile.forEach((f, i) => {
                console.log(f)
                let pull = require(directory+f);
                bot.commands.set(pull.config.name, pull);  
                pull.config.aliases.forEach(alias => {
                    bot.aliases.set(alias, pull.config.name)
                });
            });
        });
    });
});

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = message.content.substring(message.content.indexOf(' ')+1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args,LapisEmoji)

})

bot.login(config.BOT_TOKEN);