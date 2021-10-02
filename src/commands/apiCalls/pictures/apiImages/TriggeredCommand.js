const BaseCommand = require('../../../../utils/structures/BaseCommand');
const {MessageAttachment} = require('discord.js')
const {error} = require('../../../../commandhandler/Commanderror')
const LapisEmoji = require('../../../../emoji/emoji.json');

module.exports = class ImageCommand extends BaseCommand {
  constructor() {
    super('triggered',
     'apiCalls',
      [],
      "gets a picture of your discord avatar modified",
      "?triggered \n ?triggered <@user>"
      );
  }

  run(client, message, args) {
    var url = `https://some-random-api.ml/canvas/triggered?avatar=`;

    if(!message.mentions.users.first())
    {
        let avatarurl = message.author.avatarURL({size: 1024});
        url += `${avatarurl.replace("webp", "png")}`;
    }else
    {
        let avatarurl = message.mentions.users.first().avatarURL({size: 1024})
        url += `${avatarurl.replace("webp", "png")}`;
    }
    let attachment = new MessageAttachment(url, 'triggered.gif');
    message.channel.send({content: `Triggered`, files: [
      { attachment: url }
    ]}).catch( () => {
          error(message).then(msg => {msg.react(LapisEmoji.Lapis6.Emoji)});
      });   //send the attachment   
 
  }
}