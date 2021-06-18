const Discord = require('discord.js');
const SteamAPI = require('steamapi');
const steam = new SteamAPI('FCC56E958BACFA865B39EEBBC425C0BE');
const dateFormat = require('dateformat');
const fetch = require("node-fetch");
const Skey = "FCC56E958BACFA865B39EEBBC425C0BE";
module.exports.run = async (bot, message, args,LapisEmoji,error) => {

const PLAYER={};

var status = {
    0: "Offline",
    1: "Online",
    3: "Away"
  };

    const args1 = message.content.split(' ');
    if(!args1[1])
    {
        message.channel.send("Heyy I need steam user's name");
    }
    else
    {
        let url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/V0001/?key=${Skey}&vanityurl=${args1[1]}`;
        fetch(url).then(res => res.json()).then(body => {

            if(body.response.success===42)
            {
                let embed = new Discord.MessageEmbed()
                .setTitle("Sorry but I cannot found this user")
                .setColor(`#42e0f5`)
                .setDescription(`[Link](https://steamcommunity.com/id/${args1[1]}).`)
                message.channel.send(embed)
                message.react("😞");
            }
            else
            {
                steam.getUserSummary(body.response.steamid).then(summary => {
                    let embed = new Discord.MessageEmbed()
                    .setAuthor("Steam services | " + summary.nickname, summary.avatar.small)
                    .setTitle('Steam Player '+ summary.nickname)
                    .setColor(`#42e0f5`)
                    .setThumbnail(summary.avatar.medium)
                    .setDescription("Player basic info")
                    .addField("Status", status[summary.personaState])
                    .addField("Account created ", dateFormat(summary.created*1000,"d/mm/yyyy (h:MM:ss tt)"))
                    .addField("Last connection ", dateFormat(summary.lastLogOff*1000,"d/mm/yyyy (h:MM:ss tt)"))
                    .addField("Country", summary.countryCode)
                    .addField("Playing ", summary.gameExtraInfo)
                    .addField("Steam link",`[link to profile](${summary.url}).`)
                    message.channel.send(embed)
                });            }
        }).catch(() => {
            error.error(message);
        });
    }
}

module.exports.config = {
    name: "steam",
    description: "Gets steam user's profile",
    usage: "?steam",
    accessableby: "Members",
    help:"?steam <steamid> \n requires steam custom url",
    aliases: []
}