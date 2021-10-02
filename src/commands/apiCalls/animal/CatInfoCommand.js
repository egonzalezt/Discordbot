const BaseCommand = require('../../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const {apiGetCall} = require('../../../api/axios')
const {error} = require('../../../commandhandler/Commanderror')

module.exports = class CatInfoCommand extends BaseCommand {
  constructor() {
    super('catfact',
     'apiCalls',
      ['datomichi','cf'],
      "Get curious facts about cats",
      "?catfact"
    );
  }

  run(client, message, args) { 
    let url = "https://some-random-api.ml/facts/cat";
    apiGetCall(url).then(body => {
        let embed = new Discord.MessageEmbed()
        .setTitle("Cat fact")
        .setColor(`RANDOM`)
        .setDescription(body.fact)
        message.channel.send({ embeds: [embed] })
    }).catch(() => {error(message);});  
  }
}