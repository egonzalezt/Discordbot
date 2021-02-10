const Discord = require('discord.js');
const os = require('os');
module.exports.run = async (bot, message, args,LapisEmoji) => {
    // uses Nodejs module os to get system specs
    const embe = new Discord.MessageEmbed()
        .setTitle(`Server specs`)
        .setColor(`RANDOM`)
        .addField("Your amount of ram memory",os.totalmem())
        .addField("Free memory ram on your system",os.freemem())
        .addField("Your os ver",os.release())
        .addField("Platform ",os.platform())
        message.channel.send(embe).then(send => {
            send.react(LapisEmoji.Lapis4.Emoji);
        });
}

module.exports.config = {
    name: "server",
    description: "Get bot server specs",
    usage: "?server",
    accessableby: "Members",
    aliases: ['sv']
}