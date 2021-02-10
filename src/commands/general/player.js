const Discord = require('discord.js');
const path = require('path')
//let locate  = path.resolve('handler', 'error.js') 
//const error = require(locate)
const error = require('/app/src/handler/error.js')

module.exports.run = async (bot, message, args,LapisEmoji) => {
    // uses Nodejs module os to get system specs
    if(!message.mentions.users.first())//detect if the message don't content @ to send message owner user info
    {
        const embed = new Discord.MessageEmbed()
        .setColor('#42e0f5')
        .setAuthor("User " + message.author.username, message.author.avatarURL())
        .setTitle(message.author.username)
        .setDescription("hey hey look at my profile")
        .addField("My id",message.author.discriminator)
        .addField("Joined at",message.author.createdAt)
        .setImage(message.author.avatarURL({size: 1024}))
        message.channel.send(embed).then(()=>{}).catch( ()=>{error(message);});
    }
    else if(message.mentions.users.first())
    {
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(message.mentions.users.first().username)
            .setDescription("hey hey look at my profile")
            .addField("My id ", message.mentions.users.first().discriminator)
            .setImage(message.mentions.users.first().avatarURL({size: 1024}))
            .addField("Joined at",message.mentions.users.first().createdAt)
            message.channel.send(embed).then(msg => {}).catch((err)=>{error.error(message);message.channel.send("Invalid user");});
    }
}

module.exports.config = {
    name: "player",
    description: "User profile",
    usage: "?player",
    accessableby: "Members",
    aliases: ['p','jugador','py']
}