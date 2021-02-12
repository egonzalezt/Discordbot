const Discord = require('discord.js');
/*
const path = require('path')
let locate  = path.resolve('handler', 'error.js');
const error = require(locate);
*/
const error = require('/app/src/handler/error.js')

module.exports.run = async (bot, message, args,LapisEmoji) => {
    let embed = new Discord.MessageEmbed()//create embed message with the server basic info
        .setColor("RANDOM")
        .setTitle("Server Info")
        .setImage(message.guild.iconURL)
        .setDescription(message.guild.name+"'s information")
        .addField("Owner", "The owner of this server is " + message.guild.owner.user.username)
        .addField("Member Count  This server has ", message.guild.memberCount + " members")
        .addField("Emoji Count This server has ", message.guild.emojis.cache.size + " emojis")
        .addField("Roles Count This server has ", message.guild.roles.cache.size + " roles")
        message.channel.send(embed).then(msg => {}).catch(err => {error.error(message);});    
}

module.exports.config = {
    name: "owner",
    description: "Discord server owner",
    usage: "?owner",
    accessableby: "Members",
    help:"only type ?owner",
    aliases: ['admin']
}