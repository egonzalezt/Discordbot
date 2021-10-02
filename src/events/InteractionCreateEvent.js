// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-interactionCreate
const BaseEvent = require('../utils/structures/BaseEvent');
const { MessageActionRow, MessageSelectMenu,MessageEmbed } = require('discord.js');

module.exports = class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super('interactionCreate');
  }

  async run(client, interaction) {

    const {commandName,options} = interaction

    if (interaction.isSelectMenu() && interaction.customId=="HelpCommand") {
      var lista = [];
      var alreadyAdded=[]
      var comandos = client.commands
      comandos.forEach((value, key, map) => {
        if(value.category==interaction.values && !alreadyAdded.includes(value.name))
        {
          alreadyAdded.push(value.name)
          lista.push({
            label: value.name,
            description: value.description,
            value: value.name,
          })
        }
      });
      //console.log(lista)
      const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('HELP')
					.setPlaceholder('Nothing selected')
					.addOptions(lista),
			);
      await interaction.update({ content: 'Hmmm let me check', components: [row] });
    }


    if (interaction.isSelectMenu() && interaction.customId=="HELP") {
      var cmd = interaction.values[0];      
      let commandfile=''
      let Fail=false
      try
      {
        commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
      }catch(err)
      {
        Fail = true
        interaction.reply("Unknown command");
      }

      if(!Fail)
      {
        var aliases="";

        aliases= commandfile.aliases
        if(aliases.length==0)
        {
          aliases="This command doesn't have alias"
        }else
        {
          aliases= aliases.toString()
        }

        let embed = new MessageEmbed()//create embed message with the server basic info
        .setColor("RANDOM")
        .setTitle(`Command ${commandfile.name}`)
        .addField("Usage", commandfile.usage)
        .addField("Aliases ", aliases)
        .addField("Description ", commandfile.description)
        await interaction.reply({ embeds: [embed] });
        
      }
    }

    if(commandName=='invocar')
    {
      const user = options.getUser('user')
      const txt = options.getString('text')
      if(user==null)
      {
        interaction.reply({content:`Hey ${interaction.user.username} I can't talk with other bots`,ephemeral:true})
      }else
      {
        const userrequirement= `Hey ${user.username}, ${interaction.user.username} needs you on ${interaction.member.guild.name} server and says ${txt}`
        user.send({content:userrequirement,ephemeral:true}).then(()=>{
          interaction.reply({content:`Message sent successfully to ${user.username}`,ephemeral:true})
        })
      }
    }
    
  }
}
  