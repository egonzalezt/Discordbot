const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args,LapisEmoji,error) => {
    let url = "https://some-random-api.ml/meme";
    fetch(url).then(res => res.json()).then(body => {
        let embed = new Discord.MessageEmbed()
        .setTitle("Meme")
        .setColor(`RANDOM`)
        .setDescription("Category " + body.category)
        .setImage(body.image)
        message.channel.send(embed);
    }).catch(() => {error.error(message);});
}

module.exports.config = {
    name: "meme",
    description: "gets a random meme",
    usage: "?meme",
    accessableby: "Members",
    help:"only type ?meme",
    aliases: []
}