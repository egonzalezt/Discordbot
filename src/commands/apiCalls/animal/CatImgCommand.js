const BaseCommand = require('../../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const {apiGetCall} = require('../../../api/axios')
const {error} = require('../../../commandhandler/Commanderror')
module.exports = class CatfactCommand extends BaseCommand {
  constructor() {
    super('cat', 'apiCalls', [],"Random cat picture","?cat");
  }

  run(client, message, args) {
    apiGetCall('https://aws.random.cat/meow').then(res => {
      const embed = new Discord.MessageEmbed()
      .setTitle(`Random Cat Image`)
      .setColor(`#f3f3f3`)
      .setImage(res.file)
      return message.channel.send({ embeds: [embed] });
    }).catch(() => {
      error(message);
    });
  }
}