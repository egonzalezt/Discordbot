const Discord = require('discord.js');

module.exports.run = async (bot, message, args,LapisEmoji,error) => {
    if(!message.mentions.users.first())//send the user profile if they didn't pin other user
    {
        const embed = new Discord.MessageEmbed()
        .setColor('#42e0f5')
        .setTitle(`${message.author.username}`)
        .setDescription(message.author.avatarURL())
        .setImage(message.author.avatarURL({size: 2048}))
        message.channel.send(embed);
    }
    else if(message.mentions.users.first())//detect if the user contains @
    {
        try//send and embed message with the info and handle errors if the rol didn't exist
        {
            const embed = new Discord.MessageEmbed()
            .setColor('#42e0f5')
            .setTitle(`${message.mentions.users.first().username}`)
            .setDescription(message.author.avatarURL())
            .setImage(message.mentions.users.first().avatarURL({size: 2048}))
            message.channel.send(embed);
        }
        catch//send a error message if something happends
        {
            message.channel.send("Invalid user")
            error.error(message);
        }
    }   
}

module.exports.config = {
    name: "avatar",
    description: "Discord user profile picture",
    usage: "?avatar",
    accessableby: "Members",
    help:"?avatar \n ?avatar <@user>",
    aliases: ['foto','av']
}