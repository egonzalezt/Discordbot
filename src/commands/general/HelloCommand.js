const BaseCommand = require('../../utils/structures/BaseCommand');
const LapisEmoji = require('../../emoji/emoji.json')
const {error} = require('../../commandhandler/Commanderror')
module.exports = class HelloCommand extends BaseCommand {
  constructor() {
    super(
      'hello',
      'general',
      ['hi'],
      "Lapis say hello to you :)",
      "only type ?hello and react lapis emoji"
      );
  }

  run(client, message, args) {
    message.channel.send(`hello ${message.author}`)
    .then(msg => 
        {
            msg.react(LapisEmoji.Lapis1.Emoji)
            message.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.id == LapisEmoji.Lapis15.id),
                { max: 1, time: 10000 }).then(collected => {
                    if (collected.first().emoji.id == LapisEmoji.Lapis15.id) {
                        message.channel.send("https://tenor.com/view/steven-universe-lapis-lazuli-gif-7334165");
                    }
            }).catch(() => {});
        })
    .catch((err) => {
      error(message);
    });
  }
}