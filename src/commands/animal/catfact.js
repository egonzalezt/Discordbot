const Discord = require('discord.js');
const fetch = require("node-fetch");
/*
const path = require('path');
let locate  = path.resolve('handler', 'error.js');
const error = require(locate);
*/
const error = require('/app/src/handler/error.js')

module.exports.run = async (bot, message, args,LapisEmoji) => {
    let url = "https://some-random-api.ml/facts/cat";
    fetch(url).then(res => res.json()).then(body => {
        let embed = new Discord.MessageEmbed()
        .setTitle("Cat fact")
        .setColor(`RANDOM`)
        .setDescription(body.fact)
        message.channel.send(embed)
    }).catch(() => {error.error(message);});  

}

module.exports.config = {
    name: "catfact",
    description: "Get curious facts about cats",
    usage: "?catfact",
    accessableby: "Members",
    help:"only type ?catfact",
    aliases: ['datomichi','cf']
}