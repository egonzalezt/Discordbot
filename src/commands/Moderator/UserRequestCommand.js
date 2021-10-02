const BaseCommand = require('../../utils/structures/BaseCommand');
const LapisEmoji = require('../../emoji/emoji.json')

module.exports = class UserRequestCommand extends BaseCommand {
  constructor() {
    super(
      'urequest',
      'Moderator',
      ['invocar','urqst','urequest'],
      "Request a user to specific channel",
      "?urequest <@username> <message>"
      );
  }

  run(client, message, args) {  
    try
    {
        if(message.mentions.users.first()) 
        {
            let user1 = message.mentions.users.first();
            if(!user1.bot)
            {
              let messageU = args.toString().replace(/,/g," ");
              user1.send(message.author.username+" needs you on "+message.channel.name+" From "+message.channel.guild.name+" Server and says \n"+messageU)
              .then(msg => {
                  msg.react(LapisEmoji.Lapis15.Emoji)
                      msg.awaitReactions((reaction, user) => user.id == user1.id &&  (reaction.emoji.id == LapisEmoji.Lapis15.id),
                        { max: 1, time: 10000 }).then(collected => {
                          if (collected.first().emoji.id == LapisEmoji.Lapis15.id) 
                          {
                            message.author.send("Hey "+message.author.username+", "+msg.channel.recipient.username+" React to your message.");
                          }
                        }).catch(() => {});
              }).then((msg1)=>{message.author.send("Hey "+message.author.username+", Your request have send have a good day :)");});
            }
            else
            {
              message.channel.send("Sorry but this is not an user")
            }
        }
        else
        {
          message.channel.send("First at all I need a user");
        }
    }
    catch
    {
      message.reply(`Oops something went wrong`)
    }
  }
}