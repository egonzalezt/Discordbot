const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const {error} = require('../../commandhandler/Commanderror')
module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super(
      'avatar',
      'UserInformation',
      ['foto','av'],
      "Discord user profile picture",
      "?avatar \n ?avatar <@user>"
      );
  }

  run(client, message, args) {
    if(!message.mentions.users.first())//send the user profile if they didn't pin other user
    {
        const embed = new Discord.MessageEmbed()
        .setColor('#42e0f5')
        .setTitle(`${message.author.username}`)
        .setImage(message.author.avatarURL({size: 2048}))
        message.channel.send({ embeds: [embed] });
    }
    else if(message.mentions.users.first())//detect if the user contains @
    {
        try//send and embed message with the info and handle errors if the rol didn't exist
        {
            const embed = new Discord.MessageEmbed()
            .setColor('#42e0f5')
            .setTitle(`${message.mentions.users.first().username}`)
            .setImage(message.mentions.users.first().avatarURL({size: 2048}))
            message.channel.send({ embeds: [embed] });
        }
        catch//send a error message if something happends
        {
            message.channel.send("Invalid user")
            error(message);
        }
    }   
  }
}