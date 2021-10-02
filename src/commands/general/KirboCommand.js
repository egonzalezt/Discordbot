const BaseCommand = require('../../utils/structures/BaseCommand');
const LapisEmoji = require('../../emoji/emoji.json')
const {error} = require('../../commandhandler/Commanderror')

module.exports = class KirboCommand extends BaseCommand {
  constructor() {
    super(
      'kirbo',
      'general',
      ['kb'],
      "Just Kirbo",
      "only type ?kirbo "
      );
  }
  run(client, message, args) {
    var images =['https://tenor.com/view/kirbo-gif-18598276','https://tenor.com/view/kirby-kirbo-terminal-montage-psalm-gif-19961242','https://tenor.com/view/kirbo-fart-funny-gif-22488745','https://media.discordapp.net/attachments/685689405167763456/875920338301648936/output-onlinegiftools.gif']
    var result = images[Math.floor(Math.random() * images.length)];
    message.reply(result).then((msg)=>{
      msg.react(LapisEmoji.Lapis1.Emoji)
    })
  }
}