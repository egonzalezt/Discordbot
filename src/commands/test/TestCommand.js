const BaseCommand = require('../../utils/structures/BaseCommand');
const {MessageActionRow,MessageSelectMenu,MessageEmbed} = require('discord.js')

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }
  
  async run(client, message, args) {

  }
}