const BaseCommand = require('../../utils/structures/BaseCommand');
const {error} = require('../../commandhandler/Commanderror')
const {MessageActionRow,MessageSelectMenu,MessageEmbed} = require('discord.js')

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'general', ['h',],"This commands help you to get all commands sintaxis","?help <commandname>");
  }

  run(client, message, args) {
    const row = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('HelpCommand')
				.setPlaceholder('Nothing selected')
				.addOptions([
					{
						label: 'General Commands',
						description: 'General use command',
						value: 'general',
					},
					{
						label: 'Server Commands',
						description: 'Server information',
						value: 'ServerInfo',
					},
					{
						label: 'Mod',
						description: 'Moderator Commands',
						value: 'Moderator',
					},
					{
						label: 'Entertaiment',
						description: 'Enjoy usefull commands',
						value: 'apiCalls',
					},
          {
						label: 'Games',
						description: 'Some games',
						value: 'games',
					},
				]),
		);
	  message.channel.send({ content: 'Hey need help, Lapis here', components: [row]});
  }
}