const BaseCommand = require('../../utils/structures/BaseCommand');
const LapisEmoji = require('../../emoji/emoji.json')
const Discord = require('discord.js');

module.exports = class UserinfoCommand extends BaseCommand {
  constructor() {
    super(
      'userinfo',
      'UserInformation',
      ['user'],
      "Discord user profile",
      "?player \n ?player <@user>"
    );
  }

  run(client, message, args) {
    if(!message.mentions.users.first())//detect if the message don't content @ to send message owner user info
    {
      const embed = new Discord.MessageEmbed()
      .setColor('#42e0f5')
      .setAuthor("User " + message.author.username, message.author.displayAvatarURL({ dynamic : true,size: 1024 }))
      .setTitle(message.author.username)
      .setDescription("hey hey look at my profile")
      .addField("My id",message.author.discriminator)
      //.addField("Joined at",message.author.createdAt)
      .setImage(message.author.displayAvatarURL({ dynamic : true,size: 1024 }))
      message.channel.send({ embeds: [embed] }).then(()=>{}).catch( ()=>{console.log("fail")});
    }
    else if(message.mentions.users.first())
    {
      const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor("User " + message.mentions.users.first().username, message.mentions.users.first().displayAvatarURL({ dynamic : true,size: 1024 }))
        .setTitle(message.mentions.users.first().username)
        .setDescription("hey hey look at my profile")
        .addField("My id ", message.mentions.users.first().discriminator)
        .setImage(message.mentions.users.first().displayAvatarURL({ dynamic : true,size: 1024 }))
        .addField("Joined at",message.mentions.users.first().createdAt)
        message.channel.send({ embeds: [embed] }).then(msg => {}).catch((err)=>{console.log("fail");message.channel.send("Invalid user");});
    }
  }
}