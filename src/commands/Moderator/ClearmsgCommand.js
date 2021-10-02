const BaseCommand = require('../../utils/structures/BaseCommand');
const LapisEmoji = require('../../emoji/emoji.json')
const {error} = require('../../commandhandler/Commanderror')
const { Permissions } = require('discord.js');
module.exports = class ClearmsgCommand extends BaseCommand {
  constructor() {
    super(
        'cls',
        'Moderator',
        [],
        "Clear 5 or more messages",
        "?cls #cleans 5 messages \n ?cls <amount of messages to delete>"
        );
  }

  run(client, message, args) {
    var value = 5;
    var num = args[0];
    let cond = true;
    if(message.guild.id=='255881707209621505')
    {
        message.channel.send("Sorry but this function was disabled on this group")
    }
    else if (message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        if(!args[0])
        {
           value = 5;
        }
        else
        {
            if(parseInt(num))
            {
                value = parseInt(num);
                if(value > 25)
                {
                    cond = false;
                    message.channel.send("Sorry but I can't delete that amount");
                    message.react(LapisEmoji.Lapis13.Emoji);
                }
            }
            else
            {
                cond = false;
                message.channel.send("Sorry but I need a number")
                message.react(LapisEmoji.Lapis6.Emoji);
            }
        } 
        if(cond)
        {
            message.channel.bulkDelete(value).then(() => {
                //console.log('Bulk deleted messages')
                message.channel.send("Bye bye " + value + " messages " + LapisEmoji.Lapis14.Emoji).then(msg => {msg.react(LapisEmoji.Lapis14.Emoji);});
            }).catch(); 
        }  
    }
    else
    {
        message.channel.send("Heyyy, what are you doing \n you need permission to run this command" + LapisEmoji.Lapis13.Emoji).then(msg => {msg.react(LapisEmoji.Lapis13.Emoji);});
    }

  }
}