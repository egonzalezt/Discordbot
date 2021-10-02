const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
module.exports = class InviteCommand extends BaseCommand {
  constructor() {
    super(
      'invite',
      'ServerInfo',
      ['iv','it'],
      "Invite lapis to your server",
      "?invite"
    );
  }

  run(client, message, args) {
    let embed = new Discord.MessageEmbed()//create embed message with the server basic info
      .setColor(`#42e0f5`)
      .setImage("https://64.media.tumblr.com/46b6a7a1200ba2ba11660e9f33a9987d/tumblr_inline_pabygfhJSe1vmcjra_500.gif")
      .addField("Invitation link",`[link](https://discord.com/api/oauth2/authorize?client_id=797947218471419952&permissions=8&scope=applications.commands%20bot).`)
    message.channel.send({ embeds: [embed] })  
  }
}