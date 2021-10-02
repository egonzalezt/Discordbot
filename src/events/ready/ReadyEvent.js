const { CommandInteraction,Constants } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');
    client.user.setActivity("In develop ?help");
    const guildId = "678439901544316928"
    const guild = client.guilds.cache.get(guildId)
    let commands
    if(guild)
    {
      commands = guild.commands 
    }
    else{
      commands = client.application?.commands
    }
    
    commands?.create({
      name:'invocar',
      description:'Call a user',
      options: [{
        name: "user",
        description:"User",
        required:true,
        type: Constants.ApplicationCommandOptionTypes.USER,
      },
      {
        name: "text",
        description:"Message",
        required:true,
        type: Constants.ApplicationCommandOptionTypes.STRING,
      }],
    })
  }
}