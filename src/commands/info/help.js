const Discord = require('discord.js');

module.exports.run = async (bot, message, args,LapisEmoji,error) => {

    let messageArray = message.content.split(" ");
    let cmd = messageArray[1];
    let prefix='?'
    if(!messageArray[1])
    {
        message.channel.send("Sorry but I need a command to help you");
    }else
    {
        let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
        if(!commandfile)
        {
            message.channel.send("Unknown command");
        }
        else
        {
            let embed = new Discord.MessageEmbed()//create embed message with the server basic info
            .setColor("RANDOM")
            .setTitle("Command help")
            //.setImage(message.guild.iconURL)
            //.setDescription(message.guild.name+"'s information")
            .addField("Usage", commandfile.config.help)
            .addField("Aliases ", commandfile.config.aliases)
            .addField("Description ", commandfile.config.description)
            message.channel.send(embed).then(msg => {}).catch(err => {error.error(message);});  
        }
    }
}

module.exports.config = {
    name: "help",
    description: "This commands help you to get all commands sintaxis",
    usage: "?help",
    accessableby: "Members",
    help:"?help <commandname>",
    aliases: ['h']
}