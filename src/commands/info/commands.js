const Discord = require('discord.js');

module.exports.run = async (bot, message, args,LapisEmoji,error) => {
    message.channel.send("Hey look at your dm!!").then(msg => {
        let commando = new Discord.MessageEmbed()
            .setTitle(`Lapis commands`)
            .setColor(`#42e0f5`)
            .setAuthor("Lapis bot",msg.author.avatarURL())
            .setDescription(`Hey ${message.author} those are my commands \n to get more information use ?help <command>`)
            .addField("?invite","To invite lapis on your server")
            .addField("?cat", "Return cat random pic")
            .addField("?dog", "Return dog random pic")
            .addField("?hello", "Lapis say hello to you")
            .addField("?commands", "This are my commands")
            .addField("?server", "To see the server specs ")
            .addField("?save", "To save a message to send it later")
            .addField("?random", "To generate a random number")
            .addField("?image something", "Lapis send a picture ")
            .addField("?player", "To see your or another user profile")
            .addField("?emoji", "Lapis send to you a random emoji")
            .addField("?cls", "Clear 5 messages on current chat")
            .addField("?steam player", "To see steam basic player info")
            .addField("?meme","Lapis send to you a random meme")
            .addField("?lyrics song name","Get a song info")
            .addField("?catfact","Interesting info about cats")
            .addField("?bw","Transform player avatar to black and white")
            .addField("?rainbow","Transform player profile pic with rainbow")
            .addField("?wasted","User profile pic gta wasted style")
            .addField("?triggered","your avatar get triggered")
            .addField("?wasted1","3 users profile pic gta wasted style")
            .addField("?gem","Lapis send a random SU character")
        message.author.send(commando);
    });
}

module.exports.config = {
    name: "commands",
    description: "Lapis commands",
    usage: "?commands",
    accessableby: "Members",
    help:"only type ?commands",
    aliases: ['cmd']
}