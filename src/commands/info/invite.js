const Discord = require('discord.js');

module.exports.run = async (bot, message, args,LapisEmoji) => {
    let embed = new Discord.MessageEmbed()
        .setColor(`#42e0f5`)
        .setImage("https://64.media.tumblr.com/46b6a7a1200ba2ba11660e9f33a9987d/tumblr_inline_pabygfhJSe1vmcjra_500.gif")
        .addField("Invitation link",`[link to profile](https://discord.com/api/oauth2/authorize?client_id=797947218471419952&permissions=8&scope=bot).`)
        message.channel.send(embed)
}

module.exports.config = {
    name: "invite",
    description: "Invite lapis to your server",
    usage: "?invite",
    accessableby: "Members",
    help:"only type ?invite",
    aliases: ['iv','it']
}