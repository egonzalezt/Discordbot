const Discord = require('discord.js');
const {get} = require("snekfetch");
const path = require('path')
//let locate  = path.resolve('handler', 'error.js') 
//const error = require(locate)
const error = require('/app/src/handler/error.js')

module.exports.run = async (bot, message, args,LapisEmoji) => {
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
    aliases: []
}