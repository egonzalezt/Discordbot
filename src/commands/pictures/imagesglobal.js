const Discord = require('discord.js');
const {get} = require("snekfetch");
const path = require('path')
//let locate  = path.resolve('handler', 'error.js');
//const error = require(locate);
const error = require('/app/src/handler/error.js')

module.exports.run = async (bot, message, args,LapisEmoji) => {
    const args1 = message.content.split(' ');
    let comando = args1[0];
    const type = comando.replace('?','')
    //console.log(type);

    var url = ``;
    
    if(type === 'bw')
    {
        url = `https://some-random-api.ml/canvas/threshold?avatar=`
    }
    else if(type === 'rainbow')
    {
        url = `https://some-random-api.ml/canvas/gay?avatar=`
    }
    else if(type === 'glass')
    {
        url = `https://some-random-api.ml/canvas/glass?avatar=`
    }
    else if(type === 'wasted')
    {
        url = `https://some-random-api.ml/canvas/wasted?avatar=`
    }
    else if(type === 'triggered')
    {
        url = `https://some-random-api.ml/canvas/triggered?avatar=`
    }
    else if(type === 'invert')
    {
        url = `https://some-random-api.ml/canvas/invert?avatar=`
    }

    if(!message.mentions.users.first())
    {
        let avatarurl = message.author.avatarURL({size: 1024});
        url += `${avatarurl.replace("webp", "png")}`;
    }else
    {
        let avatarurl = message.mentions.users.first().avatarURL({size: 1024})
        url += `${avatarurl.replace("webp", "png")}`;
    }
    message.channel.send("Loading..."+ "https://media1.tenor.com/images/cee0050ee665b830cb5e56a4895a74f4/tenor.gif").then(msg => {
        get(url).then(res =>
            {
                msg.delete();
                //message.channel.attachFiles([url]);
                const attach = new Discord.MessageAttachment(url)
                message.channel.send(attach).then(msg => {msg.react(LapisEmoji.Lapis12.Emoji)});
            }).catch( () => {
                msg.delete();
                error.error(message).then(msg => {msg.react(LapisEmoji.Lapis6.Emoji)});
            })        
    })
}

module.exports.config = {
    name: "Image api",
    description: "gets a picture of your avatar modified",
    usage: "?bw",
    accessableby: "Members",
    aliases: ['bw','rainbow','wasted','triggered','invert','glass']
}