const Discord = require('discord.js');
const config = require("./config.json");
const LapisEmoji = require("./emoji.json");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const path = require('path');
const error = require('./handler/error')
const mongo = require('./mongo')
const scheduledSchema = require('./models/scheduled-schema')


bot.on("guildMemberAdd", member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'general')
    welcomeChannel.send (`Welcome! ${member}`)
})

bot.on('ready', async() => {
    console.log('Bot Now connected!');
    console.log('Logged In as', bot.user.tag)
    bot.user.setStatus('online'); // online, idle, invisible, dnd
    bot.user.setActivity("In develop ?help"); 
    console.log('Bot status: ', bot.user.presence.status);
    /*await mongo().then((mongoose) => {
        try {
          console.log('Connected to mongo!')
        } finally {
          mongoose.connection.close()
        }
    });*/
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

//var p = "./commands"
var p = "/app/src/commands/"
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
        //let directory =`./${ruta}/`
        let directory =`${ruta}/`
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
    if(commandfile) 
    {
        message.react(LapisEmoji.Lapis15.Emoji);
        commandfile.run(bot,message,args,LapisEmoji,error)
    }
    else
    {
        message.reply(`Sorry ${message.author.username} Unknow command please use ?commands to get all the information`)
    }

    const checkForPosts = async () => {
        const query = {
          date: {
            $lte: Date.now(),
          },
        }
  
        var results;

        await mongo().then( async (mongoose) => {
            try {

                results = await scheduledSchema.find(query)

                for (const post of results) 
                {
                    const { guildId, channelId, content } = post
                    console.log(post)
                    const guild = await bot.guilds.fetch(guildId)
                    if (!guild) 
                    {
                        continue
                    }
                    const channel = guild.channels.cache.get(channelId)
                    if (!channel) 
                    {
                        continue
                    }
                    bot.channels.cache.get(channelId).send(content);
                }
          
                await scheduledSchema.deleteMany(query)

            } finally {
                mongoose.connection.close()
            }
        });
  
        setTimeout(checkForPosts, 1000 * 10)
      }
  
    checkForPosts()

})

bot.login(config.BOT_TOKEN);