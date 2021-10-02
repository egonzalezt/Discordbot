const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const SteamAPI = require('steamapi');
const Skey = require('../../../slappey.json');
const steam = new SteamAPI(Skey.steam);
const dateFormat = require('dateformat');
const {apiGetCall} = require('../../api/axios');
const {error} = require('../../commandhandler/Commanderror');

module.exports = class SteamCommand extends BaseCommand {
  constructor() {
    super(
      'steam', 
      'apiCalls',
       [],
       "Gets steam user's profile",
       "?steam <steamid> \n requires steam custom url"
       );
  }

  async run(client, message, args) {
    const PLAYER={};

    var status = {
        0: "Offline",
        1: "Online",
        3: "Away"
      };
    
    if(!args[0])
    {
        message.channel.send("Heyy I need steam user's name");
    }
    else
    {
      try
      {
        let url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/V0001/?key=${Skey.steam}&vanityurl=${args[0]}`;
        await apiGetCall(url).then(body => {
          if(body.response.success===42)
          {
              let embed = new Discord.MessageEmbed()
              .setTitle("Sorry but I cannot found this user")
              .setColor(`#42e0f5`)
              .setDescription(`[Link](https://steamcommunity.com/id/${args[0]}).`)
              message.channel.stopTyping(true);
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
              .addField("Playing ", summary.gameExtraInfo?summary.gameExtraInfol:"No playing")
              .addField("Steam link",`[link to profile](${summary.url}).`)
              message.channel.send({ embeds: [embed] })
            });            }
        }).catch(() => {
            error(message);
        });
      }
      catch
      {
        message.reply('Oops something went wrong')
      }
    }
  }
}