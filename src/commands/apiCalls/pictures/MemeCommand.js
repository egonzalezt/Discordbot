const BaseCommand = require('../../../utils/structures/BaseCommand');
const {apiGetCall} = require('../../../api/axios')
const {error} = require('../../../commandhandler/Commanderror')
const Discord = require('discord.js');
module.exports = class MemeCommand extends BaseCommand {
  constructor() {
    super('meme', 'apiCalls', [],"gets a random meme","?meme");
  }

  run(client, message, args) {
    let url = "https://some-random-api.ml/meme";
    apiGetCall(url).then(body => {
        let embed = new Discord.MessageEmbed()
        .setTitle("Meme")
        .setColor(`RANDOM`)
        .setDescription("Category " + body.category)
        .setImage(body.image)
        message.channel.send({ embeds: [embed] });
    }).catch(() => {error(message);});
  }
}