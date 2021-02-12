const Discord = require('discord.js');
const fetch = require("node-fetch");
/*
const path = require('path')
let locate  = path.resolve('handler', 'error.js') 
const error = require(locate)
*/
const error = require('/app/src/handler/error.js')

module.exports.run = async (bot, message, args,LapisEmoji) => {
    const args1 = message.content.split(' ');
    if(!args1[1])
    {
        message.channel.send("Sorry but i need a song title")
    }
    else
    {
        args1.shift();
        let song = args1.toString().replace(/,/g," ");
        //console.log(args[1]);
        let url = "https://some-random-api.ml/lyrics?title="+song;
        fetch(url).then(res => res.json()).then(body => {
            let embed = new Discord.MessageEmbed()
            .setAuthor(body.author)
            .setTitle(body.title)
            .setColor(`RANDOM`)
            .setImage(body.thumbnail.genius)
            .addField("Lyrics",`[Song link](${body.links.genius}).`)
            message.channel.send(embed)
        }).catch(() => {
            error.error(message).then(msg => {msg.react(LapisEmoji.Lapis6.Emoji)})
        });
    }
}

module.exports.config = {
    name: "lyrics",
    description: "Get song information",
    usage: "?lyrics",
    accessableby: "Members",
    help:"?lyrics <songname>",
    aliases: ['ly']
}