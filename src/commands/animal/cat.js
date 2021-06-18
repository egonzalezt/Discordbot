const Discord = require('discord.js');
const {get} = require("snekfetch");

module.exports.run = async (bot, message, args,LapisEmoji,error) => {
    get('https://aws.random.cat/meow').then(res => {
        const embed = new Discord.MessageEmbed()
        .setTitle(`Random Cat Image`)
        .setColor(`#f3f3f3`)
        .setImage(res.body.file)
        return message.channel.send({embed});
    }).catch(() => {
        error.error(message);
    });
}

module.exports.config = {
    name: "cat",
    description: "Random cat picture",
    usage: "?cat",
    accessableby: "Members",
    help:"only type ?cat",
    aliases: []
}