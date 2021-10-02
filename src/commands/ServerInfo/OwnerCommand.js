const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class OwnerCommand extends BaseCommand {
  constructor() {
    super(
      'owner', 
      'ServerInfo',
      ['admin'],
      "Discord server owner",
      "?owner"
    );
  }

  run(client, message, args) {
    message.channel.send('Owner command works');
  }
}