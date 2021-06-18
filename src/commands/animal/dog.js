const Discord = require('discord.js');
const {get} = require("snekfetch");

module.exports.run = async (bot, message, args,LapisEmoji,error) => {
    get('https://dog.ceo/api/breeds/image/random').then(res => {
        const embed = new Discord.MessageEmbed()
        .setTitle(`Random Dog Image`)
        .setColor(`#f3f3f3`)
        .setImage(res.body.message)
        return message.channel.send({embed});
    }).catch(() => {
        error.error(message);
    });
}

module.exports.config = {
    name: "dog",
    description: "Random cat picture",
    usage: "?dog",
    accessableby: "Members",
    help:"only type ?dog",
    aliases: []
}