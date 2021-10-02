const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ServerCommand extends BaseCommand {
  constructor() {
    super('server', 'general', ['s'],"This commands help you to get all commands sintaxis","?help <commandname>");
  }

  run(client, message, args) {
    message.channel.send('Server command disabled temporaly');
  }
}