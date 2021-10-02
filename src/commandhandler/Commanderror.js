const Discord = require('discord.js');
const commands = {};

function error(message)
{
    var fail = "https://media1.tenor.com/images/10b4e6780975558e86591258284ab55f/tenor.gif";
    const embed = new Discord.MessageEmbed()
    .setColor(`#f3f3f3`)
    .setImage(fail)
    .setTitle("Opps")

    //.attachFiles([fail]);
    return message.channel.send({ embeds: [embed] });
}

commands.error = error;

module.exports = commands;