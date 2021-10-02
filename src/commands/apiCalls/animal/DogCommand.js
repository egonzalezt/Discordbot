const BaseCommand = require('../../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const {apiGetCall} = require('../../../api/axios')
const {error} = require('../../../commandhandler/Commanderror')

module.exports = class DogCommand extends BaseCommand {
  constructor() {
    super('dog', 'apiCalls', [],"Random dog picture","?dog");
  }

  run(client, message, args) {
    apiGetCall('https://dog.ceo/api/breeds/image/random').then(res => {
      const embed = new Discord.MessageEmbed()
      .setTitle(`Random Dog Image`)
      .setColor(`#f3f3f3`)
      .setImage(res.message)
      return message.channel.send({ embeds: [embed] });
    }).catch(() => {
      error(message);
    });
  }
}