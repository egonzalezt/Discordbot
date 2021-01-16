const SteamAPI = require('steamapi');
const steam = new SteamAPI('0890A4315901863AC41E676FD5A32ABD');
const Discord = require('discord.js');
const dateFormat = require('dateformat');
const fetch = require("node-fetch");
const Skey = "0890A4315901863AC41E676FD5A32ABD";

const PLAYER={};

var status = {
    0: "Offline",
    1: "Online",
    3: "Away"
  };

function get_id(message)
{
    const args = message.content.split(' ');
    if(!args[1])
    {
        message.channel.send("Heyy I need steam user's name");
    }
    else
    {
        let url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/V0001/?key=${Skey}&vanityurl=${args[1]}`;
        fetch(url).then(res => res.json()).then(body => {

            if(body.response.success===42)
            {
                let embed = new Discord.MessageEmbed()
                .setTitle("Sorry but I cannot found this user")
                .setColor(`#42e0f5`)
                .setDescription(`[Link](https://steamcommunity.com/id/${args[1]}).`)
                message.channel.send(embed)
                message.react("😞");
            }
            else
            {
                test(body.response.steamid,message);
            }
        });
    }
}

function test(id,message) {
    playerdata(id,message);
}

function playerdata(id,message)
{
    steam.getUserSummary(id).then(summary => {
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
});
};


PLAYER.get_id = get_id;
module.exports = PLAYER;
